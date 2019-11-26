from apps.users.serializers import UserBasicSerializer


def jwt_response_payload_handler(token, user=None, request=None):
    """
    Extends the default JWT response data returned after login or refresh to include user data
    """
    return {
        'token': token,
        'user': UserBasicSerializer(user, context={
            'request': request
        }).data
    }
