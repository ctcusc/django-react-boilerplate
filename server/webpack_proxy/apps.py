from django.apps import AppConfig

import threading
import subprocess
import os


class WebpackProxyConfig(AppConfig):
    name = 'webpack_proxy'

    def ready(self):
        """Run this once when app starts.

        Start up webpack-dev-server monitoring thread that will make sure it stays alive.
        """
        def start_process():
            """Start a webpack-dev-server process."""
            p = subprocess.Popen(['./node_modules/webpack-dev-server/bin/webpack-dev-server.js'],
                                 cwd='../client/', shell=True, close_fds=True, encoding='utf-8',
                                 stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=None)
            return p

        def run_webpack():
            """Thread to run the webpack server and signal other threads based on status updates."""
            p = start_process()
            while True:
                try:
                    stdout = p.stdout.readline().strip()
                    if stdout:
                        print('[webpack] ' + stdout)
                except:
                    # if the process died, restart it
                    if p.returncode is not None:
                        print('[webpack] process died ({}), restarting'.format(p.returncode))
                        p = start_process()

        # this checks to make sure that we are only in the "main" django process, not an app started
        # from the autoreloader
        if os.environ.get('RUN_MAIN') != 'true':
            print('[webpack] Starting up webpack-dev-server process')
            # start the thread that communicates with webpack
            thread = threading.Thread(target=run_webpack)
            thread.daemon = True  # allow the thread to be killed when django is
            thread.start()
