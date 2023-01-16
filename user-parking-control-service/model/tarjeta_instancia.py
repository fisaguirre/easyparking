class TarjetaInstancia:

    def __init__(self, tarjeta_instancia_id, mes, dia_semana, dia_fecha, hora, minutos, patente, finalizada, usuario_id, tarjeta_id):
        self.__tarjeta_instancia_id = tarjeta_instancia_id
        self.__mes = mes
        self.__dia_semana = dia_semana
        self.__dia_fecha = dia_fecha
        self.__hora = hora
        self.__minutos = minutos
        self.__patente = patente
        self.__finalizada = finalizada
        self.__usuario_id = usuario_id
        self.__tarjeta_id = tarjeta_id

    def __init__(self, mes, dia_semana, dia_fecha, hora, minutos, patente, finalizada, usuario_id, tarjeta_id):
        self.__mes = mes
        self.__dia_semana = dia_semana
        self.__dia_fecha = dia_fecha
        self.__hora = hora
        self.__minutos = minutos
        self.__patente = patente
        self.__finalizada = finalizada
        self.__usuario_id = usuario_id
        self.__tarjeta_id = tarjeta_id

    def get_tarjeta(self, tarjeta_instancia_id, mes, dia_semana, dia_fecha, hora, minutos, patente, finalizada, usuario_id, tarjeta_id):
        return self.__tarjeta_instancia_id
        return self.__fecha
        return self.__hora
        return self.__minutos
        return self.__patente
        return self.__finalizada
        return self.__usuario_id
        return self.__tarjeta_id

    # getter method
    def get_tarjeta_instancia_id(self):
        return self.__tarjeta_instancia_id

    def get_mes(self):
        return self.__mes

    def get_dia_semana(self):
        return self.__dia_semana

    def get_dia_fecha(self):
        return self.__dia_fecha

    def get_hora(self):
        return self.__hora

    def get_minutos(self):
        return self.__minutos

    def get_patente(self):
        return self.__patente

    def get_finalizada(self):
        return self.__finalizada

    def get_usuario_id(self):
        return self.__usuario_id

    def get_tarjeta_id(self):
        return self.__tarjeta_id
