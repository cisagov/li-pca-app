FROM python:3
RUN apt update && apt install -qy openssl python3 python3-pip libffi-dev libxml2-dev libxslt1-dev && pip3 install --upgrade pip && apt autoremove -qy
RUN python3 -m pip install --upgrade pip
COPY . /app/theHarvester
WORKDIR /app/theHarvester
RUN python3 -m pip install -r requirements/dev.txt
EXPOSE 8889
CMD bash -c "cd /app/theHarvester/src/theHarvester && python3 ./restfulHarvest.py -p 8889"
