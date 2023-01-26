from firebase_admin import messaging, credentials
import firebase_admin

default_app = firebase_admin.initialize_app()

class FirebaseMessaging:
    def send_message(self, registration_token, title, body, data=None) -> Any:
        message = messaging.Message(
            notification=messaging.Notification(
                title=title,
                body=body,
            ),
            data=data,
            token=registration_token
        )
        response = messaging.send(message)
        print(response)
        return response

    def send_multicast_message(self, registration_tokens, title, body, data=None) -> Any:
        # registration_tokens has to be a list
        assert isinstance(registration_tokens, list)

        message = messaging.MulticastMessage(
            notification=messaging.Notification(
                title=title,
                body=body,
            ),
            data=data,
            token=registration_tokens
        )
        response = messaging.send_multicast(message)
        print(response)
        # See the BatchResponse reference documentation
        # for the contents of response.
        return response