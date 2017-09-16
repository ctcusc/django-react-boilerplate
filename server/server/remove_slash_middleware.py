"""Django middleware to redirect requests with trailing URLs to the "naked" url."""

from django.http import HttpResponsePermanentRedirect


class RemoveSlashMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if '/admin' not in request.path and request.path != '/':
            if request.path[-1] == '/':
                print('Redirecting')
                return HttpResponsePermanentRedirect(request.path[:-1])
        return self.get_response(request)
