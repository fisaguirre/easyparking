class User:

    def __init__(self, usuario_id, public_id, username, password, nombre, apellido, email, rol):
        self.__usuario_id = usuario_id
        self.__public_id = public_id
        self.__username = username
        self.__password = password
        self.__nombre = nombre
        self.__apellido = apellido
        self.__email = email
        self.__rol = rol

    def __init__(self, public_id, username, password, nombre, apellido, email, rol):
        self.__public_id = public_id
        self.__username = username
        self.__password = password
        self.__nombre = nombre
        self.__apellido = apellido
        self.__email = email
        self.__rol = rol

    def get_user(self, usuario_id, public_id, username, password, nombre, apellido, email, rol):
        return self.__usuario_id
        return self.__public_id
        return self.__username
        return self.__password
        return self.__nombre
        return self.__apellido
        return self.__email
        return self.__rol

    # getter method
    def get_usuario_id(self):
        return self.__usuario_id

    def get_public_id(self):
        return self.__public_id

    def get_username(self):
        return self.__username

    def get_password(self):
        return self.__password

    def get_nombre(self):
        return self.__nombre

    def get_apellido(self):
        return self.__apellido

    def get_email(self):
        return self.__email

    def get_rol(self):
        return self.__rol
