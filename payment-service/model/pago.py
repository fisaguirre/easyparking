class Pago:

    def __init__(self, pago_id, cantidad_pago, fecha, hora, minutos, usuario_id):
        self.__pago_id = pago_id
        self.__cantidad_pago = cantidad_pago
        self.__fecha = fecha
        self.__hora = hora
        self.__minutos = minutos
        self.__usuario_id = usuario_id

    def __init__(self, cantidad_pago, fecha, hora, minutos, usuario_id):
        self.__cantidad_pago = cantidad_pago
        self.__fecha = fecha
        self.__hora = hora
        self.__minutos = minutos
        self.__usuario_id = usuario_id

    def get_user(self, pago_id, cantidad_pago, fecha, hora, minutos, usuario_id):
        return self.__pago_id
        return self.__cantidad_pago
        return self.__fecha
        return self.__hora
        return self.__minutos
        return self.__usuario_id

    # getter method
    def get_pago_id(self):
        return self.__pago_id

    def get_cantidad_pago(self):
        return self.__cantidad_pago

    def get_fecha(self):
        return self.__fecha

    def get_hora(self):
        return self.__hora

    def get_minutos(self):
        return self.__minutos

    def get_usuario_id(self):
        return self.__usuario_id
