import hashlib
import binascii
import os
from .response import response

from . import db
from schemas import db as dbs


def user_exists(email):
    try:
        sess = db.get_session()
        user = sess.query(dbs.User).filter(dbs.User.email == email)

        if len(user.all()) > 0:
            return True

        return False
    except Exception as e:
        print(e)
        exit(1)


def hash_password(password):
    """ Hash pass for storing """
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pass_hash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), salt, 100000)
    pass_hash = binascii.hexlify(pass_hash)

    return (salt + pass_hash).decode('ascii')


def verify_password(provided_pass, email):
    """ Check if the password is correct """
    try:
        sess = db.get_session()
        user = sess.query(dbs.User).filter(dbs.User.email == email).first()
        stored_pass = user.password_hash
    except Exception as e:
        print(e)
        exit(1)

    salt = stored_pass[:64]
    stored_pass = stored_pass[64:]

    pass_hash = hashlib.pbkdf2_hmac('sha512', provided_pass.encode('utf-8'),
                                    salt.encode('ascii'), 100000)
    pass_hash = binascii.hexlify(pass_hash).decode('ascii')

    return pass_hash == stored_pass
