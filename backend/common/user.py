class User(object):
    def __init__(self, email=None, password=None, fname=None, lname=None, role=None, token=None):
        self.email = email
        self.password = password
        self.first_name = fname
        self.last_name = lname
        self.role = role
        self.token = token

    @property
    def is_logged(self):
        return self.token is not None
