FROM python:3.10-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN pip install -e .

COPY . /usr/src/app

# fEXPOSE 8080

ENTRYPOINT ["python3"]

CMD ["-m", "api"]
