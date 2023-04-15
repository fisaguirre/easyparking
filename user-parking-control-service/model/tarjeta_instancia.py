class TarjetaInstancia:

    def __init__(self, tarjeta_instancia_id, fecha, dia_semana, tiempo_inicio, tiempo_fin, patente, finalizada, usuario_id, tarjeta_id):
        self.__tarjeta_instancia_id = tarjeta_instancia_id
        self.__fecha = fecha
        self.__dia_semana = dia_semana
        self.__tiempo_inicio = tiempo_inicio
        self.__tiempo_fin = tiempo_fin
        self.__patente = patente
        self.__finalizada = finalizada
        self.__usuario_id = usuario_id
        self.__tarjeta_id = tarjeta_id

    def __init__(self, fecha, dia_semana, tiempo_inicio, tiempo_fin, patente, finalizada, usuario_id, tarjeta_id):
        self.__fecha = fecha
        self.__dia_semana = dia_semana
        self.__tiempo_inicio = tiempo_inicio
        self.__tiempo_fin = tiempo_fin
        self.__patente = patente
        self.__finalizada = finalizada
        self.__usuario_id = usuario_id
        self.__tarjeta_id = tarjeta_id

    def get_tarjeta(self, tarjeta_instancia_id, fecha, dia_semana, tiempo_inicio, tiempo_fin, patente, finalizada, usuario_id, tarjeta_id):
        return self.__tarjeta_instancia_id
        return self.__fecha
        return self.__tiempo_inicio
        return self.__tiempo_fin
        return self.__patente
        return self.__finalizada
        return self.__usuario_id
        return self.__tarjeta_id

    # getter method
    def get_tarjeta_instancia_id(self):
        return self.__tarjeta_instancia_id

    def get_fecha(self):
        return self.__fecha

    def get_dia_semana(self):
        return self.__dia_semana

    def get_tiempo_inicio(self):
        return self.__tiempo_inicio

    def get_tiempo_fin(self):
        return self.__tiempo_fin

    def get_patente(self):
        return self.__patente

    def get_finalizada(self):
        return self.__finalizada

    def get_usuario_id(self):
        return self.__usuario_id

    def get_tarjeta_id(self):
        return self.__tarjeta_id
