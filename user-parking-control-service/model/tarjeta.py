class Tarjeta:

    def __init__(self, tarjeta_id, cantidad_tarjeta, usuario_id):
        self.__tarjeta_id = tarjeta_id
        self.__cantidad_tarjeta = cantidad_tarjeta
        self.__usuario_id = usuario_id

    def __init__(self, cantidad_tarjeta, usuario_id):
        self.__cantidad_tarjeta = cantidad_tarjeta
        self.__usuario_id = usuario_id

    def get_tarjeta(self, tarjeta_id, cantidad_tarjeta, usuario_id):
        return self.__tarjeta_id
        return self.__cantidad_tarjeta
        return self.__usuario_id

    # getter method
    def get_tarjeta_id(self):
        return self.__tarjeta_id

    def get_cantidad_tarjeta(self):
        return self.__cantidad_tarjeta

    def get_usuario_id(self):
        return self.__usuario_id
