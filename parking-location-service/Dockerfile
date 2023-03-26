# Use an official Python runtime as an image
FROM python:3.10

# Sets the working directory for following COPY and CMD instructions
# Notice we haven’t created a directory by this name - this instruction 
# creates a directory with this name if it doesn’t exist
WORKDIR /parking-location-service

# Install any needed packages specified in requirements.txt
COPY requirements.txt ./
#COPY requirements.txt /parking-location-service
RUN pip3 install -r requirements.txt

#COPY all folder and files in /app
COPY . ./
#COPY . /parking-location-service

# The EXPOSE instruction indicates the ports on which a container 
# will listen for connections
# Since Flask apps listen to port 5000  by default, we expose it
EXPOSE 5672
# Run app.py when the container launches
#CMD python3 app.py
CMD [ "flask", "run","--host","0.0.0.0","--port","5672", "--reload"]
