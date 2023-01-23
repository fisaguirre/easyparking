import yaml


body = {
    "name": "Sucursal Instore 2",
    "external_id": "SUC001",
    "location": {
        "street_number": "902",
        "street_name": "Av. Bartolome Mitre",
        "city_name": "Mendoza",
        "state_name": "Mendoza",
        "latitude": -32.8915427561287,
        "longitude": -68.84501132344153
    }
}
print(yaml.dump(body, default_flow_style=False))
