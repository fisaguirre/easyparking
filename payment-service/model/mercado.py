class Mercado:

    def __init__(self, cuenta_mercado_id, access_token, mercado_usuario_id, username_mercado, store_id, external_store_id, store_name, pos_id, external_pos_id, pos_name, usuario_id):
        self.__cuenta_mercado_id = cuenta_mercado_id
        self.__access_token = access_token
        self.__mercado_usuario_id = mercado_usuario_id
        self.__username_mercado = username_mercado
        self.__store_id = store_id
        self.__external_store_id = external_store_id
        self.__store_name = store_name
        self.__pos_id = pos_id
        self.__external_pos_id = external_pos_id
        self.__pos_name = pos_name
        self.__usuario_id = usuario_id

    def __init__(self, access_token, mercado_usuario_id, username_mercado, store_id, external_store_id, store_name, pos_id, external_pos_id, pos_name, usuario_id):
        self.__access_token = access_token
        self.__mercado_usuario_id = mercado_usuario_id
        self.__username_mercado = username_mercado
        self.__store_id = store_id
        self.__external_store_id = external_store_id
        self.__store_name = store_name
        self.__pos_id = pos_id
        self.__external_pos_id = external_pos_id
        self.__pos_name = pos_name
        self.__usuario_id = usuario_id

    def get_user(self, cuenta_mercado_id, access_token, mercado_usuario_id, username_mercado, store_id, external_store_id, store_name, pos_id, external_pos_id, pos_name, usuario_id):
        return self.__cuenta_mercado_id
        return self.__access_token
        return self.__mercado_usuario_id
        return self.__username_mercado
        return self.__store_id
        return self.__external_store_id
        return self.__store_name
        return self.__pos_id
        return self.__external_pos_id
        return self.__pos_name
        return self.__usuario_id

    # getter method
    def get_cuenta_mercado_id(self):
        return self.__cuenta_mercado_id

    def get_access_token(self):
        return self.__access_token

    def get_mercado_usuario_id(self):
        return self.__mercado_usuario_id

    def get_username_mercado(self):
        return self.__username_mercado

    def get_store_id(self):
        return self.__store_id

    def get_external_store_id(self):
        return self.__external_store_id

    def get_store_name(self):
        return self.__store_name

    def get_pos_id(self):
        return self.__pos_id

    def get_external_pos_id(self):
        return self.__external_pos_id

    def get_pos_name(self):
        return self.__pos_name

    def get_usuario_id(self):
        return self.__usuario_id
