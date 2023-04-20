class Pago:

    def __init__(self, pago_id, fecha, precio_total, tiempo_inicio, tiempo_fin, tiempo_total, cantidad_tarjetas, patente, cuenta_mercado_id, usuario_id):
        self.__pago_id = pago_id
        self.__fecha = fecha
        self.__precio_total = precio_total
        self.__tiempo_inicio = tiempo_inicio
        self.__tiempo_fin = tiempo_fin
        self.__tiempo_total = tiempo_total
        self.__cantidad_tarjetas = cantidad_tarjetas
        self.__patente = patente
        self.__cuenta_mercado_id = cuenta_mercado_id
        self.__usuario_id = usuario_id

    def __init__(self, fecha, precio_total, tiempo_inicio, tiempo_fin, tiempo_total, cantidad_tarjetas, patente, cuenta_mercado_id, usuario_id):
        self.__fecha = fecha
        self.__precio_total = precio_total
        self.__tiempo_inicio = tiempo_inicio
        self.__tiempo_fin = tiempo_fin
        self.__tiempo_total = tiempo_total
        self.__cantidad_tarjetas = cantidad_tarjetas
        self.__patente = patente
        self.__cuenta_mercado_id = cuenta_mercado_id
        self.__usuario_id = usuario_id

    def get_pago(self, pago_id, fecha, precio_total, tiempo_inicio, tiempo_fin, tiempo_total, cantidad_tarjetas, patente, cuenta_mercado_id, usuario_id):
        return self.__pago_id
        return self.__fecha
        return self.__precio_total
        return self.__tiempo_inicio
        return self.__tiempo_fin
        return self.__tiempo_total
        return self.__cantidad_tarjetas
        return self.__patente
        return self.__cuenta_mercado_id
        return self.__usuario_id

    # getter method
    def get_pago_id(self):
        return self.__pago_id

    def get_fecha(self):
        return self.__fecha

    def get_precio_total(self):
        return self.__precio_total

    def get_tiempo_inicio(self):
        return self.__tiempo_inicio

    def get_tiempo_fin(self):
        return self.__tiempo_fin

    def get_tiempo_total(self):
        return self.__tiempo_total

    def get_cantidad_tarjetas(self):
        return self.__cantidad_tarjetas

    def get_patente(self):
        return self.__patente

    def get_cuenta_mercado_id(self):
        return self.__cuenta_mercado_id

    def get_usuario_id(self):
        return self.__usuario_id
