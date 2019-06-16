import os
import json
from common.user_add_ons import *
from common.response import response


# POST /register
def register(event, context):
    body = json.loads(event.get("body", None))
    email = body["email"]
    password = body["password"]
    first_name = body["first_name"]
    last_name = body["last_name"]
    fn = body["fn"]

    if user_exists(email):
        return response(409, {"Error": "User with this email address already exists"})

    pass_hash = hash_password(password)

    try:
        sess = db.get_session()

        new_user = dbs.User(
            email=email,
            password_hash=pass_hash,
            first_name=first_name,
            last_name=last_name,
            fn=fn,
            role="user"
        )

        sess.add(new_user)
        sess.commit()
    except Exception as e:
        return response(500, {"Error": str(e)})

    return response(200, {"Message": "User created"})
