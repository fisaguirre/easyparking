# Use an official Python runtime as an image
FROM python:3.10

# Sets the working directory for following COPY en el contenedor
# Notice we haven’t created a directory by this name - this instruction 
# creates a directory with this name if it doesn’t exist
#WORKDIR /app/user-parking-control-service
WORKDIR /user-parking-control-service

#copia los requirements en el directorio del contenedor
COPY requirements.txt ./
#corre el comando de abajo en el contenedor
RUN pip3 install -r requirements.txt

#COPY all folder and files in /app (directorio del contenedor)
COPY . ./
#COPY . ./app/user-parking-control-service

# The EXPOSE instruction indicates the ports on which a container will listen for connections
#puerto de escucha del contenedor
EXPOSE 5000

#con CMD le paso parametros cuando se ejecuta la aplicaciòn
#--reload es para que se actualice la aplicaciòn cuando se modifica y se guarda el còdigo
CMD [ "flask", "run","--host","0.0.0.0","--port","5000", "--reload"]
