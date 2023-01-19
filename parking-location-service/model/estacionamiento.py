class Estacionamiento:

    def __init__(self, estacionamiento_id, latitud, longitud, calle, cantidad_lugares, cantidad_disponible, usuario_id):
        self.estacionamiento_id = estacionamiento_id
        self.__latitud = latitud
        self.__longitud = longitud
        self.__calle = calle
        self.__cantidad_lugares = cantidad_lugares
        self.__cantidad_disponible = cantidad_disponible
        self.__usuario_id = usuario_id

    def __init__(self, latitud, longitud, calle, cantidad_lugares, cantidad_disponible, usuario_id):
        self.__latitud = latitud
        self.__longitud = longitud
        self.__calle = calle
        self.__cantidad_lugares = cantidad_lugares
        self.__cantidad_disponible = cantidad_disponible
        self.__usuario_id = usuario_id

    def get_user(self, estacionamiento_id, latitud, longitud, calle, cantidad_lugares, cantidad_disponible, usuario_id):
        return self.__estacionamiento_id
        return self.__latitud
        return self.__longitud
        return self.__calle
        return self.__cantidad_lugares
        return self.__cantidad_disponible
        return self.__usuario_id

    # getter method
    def get_estacionamiento_id(self):
        return self.estacionamiento_id

    def get_latitud(self):
        return self.__latitud

    def get_longitud(self):
        return self.__longitud

    def get_calle(self):
        return self.__calle

    def get_cantidad_lugares(self):
        return self.__cantidad_lugares

    def get_cantidad_disponible(self):
        return self.__cantidad_disponible

    def get_usuario_id(self):
        return self.__usuario_id
