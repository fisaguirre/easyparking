FROM python:3.10-alpine
RUN apk add --no-cache build-base
RUN apk add --no-cache mariadb-dev
WORKDIR /payment-service
ENV FLASK_ENV=production
COPY requirements.txt ./
RUN pip install --upgrade pip && \
    pip3 install --no-cache-dir -r requirements.txt
RUN pip install gunicorn
COPY . ./
EXPOSE 5003
CMD [ "gunicorn", "app:app", "--bind", "0.0.0.0:5003" ]
