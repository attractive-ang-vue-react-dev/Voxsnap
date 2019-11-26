from django.utils.deprecation import MiddlewareMixin

class CorsMiddleware(MiddlewareMixin):
    """
    Just putting cors on EVERYTHING while we're testing
    but I would like to set up a decorator for specific views
    see ticket: https://github.com/robd003/voxsnap-v2/issues/72
    """
    def process_response(self, req, resp):
        resp["Access-Control-Allow-Origin"] = "*"
        return resp
