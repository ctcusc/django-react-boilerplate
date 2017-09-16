from django.apps import AppConfig

from termcolor import colored
import threading
import subprocess
import os
import sys

from .prefixed_stdout import PrefixedStdout

stdout = sys.stdout

out = PrefixedStdout(stdout, colored('[webpack]', 'green'))

sys.stdout = PrefixedStdout(stdout, colored('[django]', 'blue'))


# make printing atomic so ansi codes don't get fucked
print_lock = threading.RLock()


def webpack_print(s):
    """Atomically print a prefixed line."""
    print_lock.acquire()
    out.write(s + '\n')
    print_lock.release()


class WebpackProxyConfig(AppConfig):
    name = 'webpack_proxy'

    def ready(self):
        """Run this once when app starts.

        Start up webpack-dev-server monitoring thread that will make sure it stays alive.
        """
        def start_process():
            """Start a webpack-dev-server process."""
            p = subprocess.Popen(['./node_modules/webpack-dev-server/bin/webpack-dev-server.js --colors'],
                                 cwd='../client/', shell=True, close_fds=True, encoding='utf-8',
                                 stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=None)
            return p

        def printing_thread(stream):
            """Thread that will print lines from the given stream until EOF."""
            while True:
                try:
                    out = stream.readline().strip()
                    if out:
                        webpack_print(out)
                except:
                    raise
                    pass

        def run_webpack():
            """Thread to run the webpack server and signal other threads based on status updates."""
            p = start_process()

            while True:
                stdout = threading.Thread(target=printing_thread, args=(p.stdout,))
                stderr = threading.Thread(target=printing_thread, args=(p.stderr,))
                stdout.daemon = True
                stderr.daemon = True
                stdout.start()
                stderr.start()
                p.wait()
                if p.returncode is not None:
                    webpack_print('process died ({}), restarting'.format(p.returncode))
                    p = start_process()

        # this checks to make sure that we are only in the "main" django process, not an app started
        # from the autoreloader
        if os.environ.get('RUN_MAIN') != 'true':
            webpack_print('Starting up webpack-dev-server process')
            # start the thread that communicates with webpack
            thread = threading.Thread(target=run_webpack)
            thread.daemon = True  # allow the thread to be killed when django is
            thread.start()
