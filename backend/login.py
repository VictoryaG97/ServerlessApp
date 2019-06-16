import os
import json
from common.user_add_ons import *
from common.response import response


# POST /login
def login(event, context):
    body = json.loads(event.get("body", None))
    email = body["email"]
    password = body["password"]

    if not user_exists(email):
        return response(404, {"Error": "User with this email address doesn't exist"})

    if verify_password(password, email):
        return response(200, {"Message": "Logged in!"})
    else:
        return response(400, {"Error": "Incorrect password"})
