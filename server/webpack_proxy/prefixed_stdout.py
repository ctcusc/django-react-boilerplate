class PrefixedStdout():
    """Custom version of stdout that prefixes all input with a specified string."""

    def __init__(self, stdout, prefix=''):
        self.stdout = stdout
        self.prefix = prefix + ' '

    def write(self, string):
        """Write a string to stdout but prefix it first."""
        self.stdout.write(self.prefix)
        self.stdout.write(string)

    def flush(self):
        """Flush the underline stdout."""
        self.stdout.flush()
