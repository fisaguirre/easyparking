class TarjetaInstancia:

    def __init__(self, tarjeta_instancia_id, numero_serie, fecha, hora, minutos, patente, usuario_id):
        self.__tarjeta_instancia_id = tarjeta_instancia_id
        self.__numero_serie = numero_serie
        self.__fecha = fecha
        self.__hora = hora
        self.__minutos = minutos
        self.__patente = patente
        self.__usuario_id = usuario_id

    def __init__(self, numero_serie, fecha, hora, minutos, patente, usuario_id):
        self.__numero_serie = numero_serie
        self.__fecha = fecha
        self.__hora = hora
        self.__minutos = minutos
        self.__patente = patente
        self.__usuario_id = usuario_id

    def get_tarjeta(self, tarjeta_instancia_id, numero_serie, fecha, hora, minutos, patente, usuario_id):
        return self.__tarjeta_instancia_id
        return self.__numero_serie
        return self.__fecha
        return self.__hora
        return self.__minutos
        return self.__patente
        return self.__usuario_id

    # getter method
    def get_tarjeta_instancia_id(self):
        return self.__tarjeta_instancia_id

    def get_numero_serie(self):
        return self.__numero_serie

    def get_fecha(self):
        return self.__fecha

    def get_hora(self):
        return self.__hora

    def get_minutos(self):
        return self.__minutos

    def get_minutos(self):
        return self.__minutos

    def get_patente(self):
        return self.__patente

    def get_usuario_id(self):
        return self.__usuario_id
