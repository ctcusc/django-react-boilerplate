"""View for the webpack_proxy app, this just makes an HTTP request to webpack-dev-server."""

import logging
from urllib.request import urlopen
from urllib.error import URLError
from django.http import HttpResponse

logger = logging.getLogger(__name__)

webpack_dev_server_port = '3000'

# certain headers are "hop-by-hop" (aka properties of an individual request) and django
# doens't let us copy those
disallowed_headers = ['Connection', 'Keep-Alive', 'Proxy-Authenticate', 'Proxy-Authorization', 'TE',
                      'Trailers', 'Transfer-Encoding', 'Upgrade']


def copy_response(response):
    """Copy a response object from urllib to a Django HttpResponse."""
    code = response.code
    response_headers = response.info().items()
    body = response.read()

    django = HttpResponse(body, status=code)
    for key, value in response_headers:
        if key not in disallowed_headers:
            django[key] = value
    # so that we can tell that a response is coming from webpack not django
    django['X-Proxied-For'] = 'webpack-dev-server'

    return django


def proxy(request):
    """Make an HTTP request to webpack-dev-server and return the results.

    This view is only triggered when we didn't match any other URL
    """
    wepback_url = 'http://localhost:' + webpack_dev_server_port + request.path
    try:
        response = urlopen(wepback_url)
        return copy_response(response)
    except URLError as e:
        # only restart webpack if the error was ConnectionRefusedError, otherwise it was just a
        # normal HTTP error code and we should pass it through
        if isinstance(e.reason, ConnectionRefusedError):
            logger.error('webpack-dev-server doesn\'t seem to be running')
            return HttpResponse('webpack-dev-server doesn\'t seem to be running, this issue will \
usually resolve itself in a few seconds, if not check the logs or restart the server', status=502)
        else:
            response = e
            return copy_response(response)
