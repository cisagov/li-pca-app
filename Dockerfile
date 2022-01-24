# FROM python:3.7-alpine
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# COPY requirements.txt /usr/src/app/

# RUN pip3 install --no-cache-dir -r requirements.txt

# COPY . /usr/src/app

# EXPOSE 8080

# ENTRYPOINT ["python3"]

# CMD ["-m", "api"]

ARG GIT_COMMIT=unspecified
ARG GIT_REMOTE=unspecified
ARG VERSION=unspecified

FROM python:3.7-alpine

ARG GIT_COMMIT
ARG GIT_REMOTE
ARG VERSION

LABEL git_commit=$GIT_COMMIT
LABEL git_remote=$GIT_REMOTE
LABEL maintainer="cisagov/teams/li-pca"
LABEL vendor="Cyber and Infrastructure Security Agency"
LABEL version=$VERSION

ARG CISA_UID=421
ENV CISA_HOME="/home/cisa"
ENV API_SRC="/usr/src/api"

RUN addgroup --system --gid $CISA_UID cisa \
  && adduser --system --uid $CISA_UID --ingroup cisa cisa

RUN apk --update --no-cache add \
  bash \
  py-pip

VOLUME $CISA_HOME

WORKDIR $API_SRC
COPY . $CISA_HOME

RUN ls -la /usr/src/api
RUN pip install --no-cache-dir ${API_SRC}
RUN chmod +x ${API_SRC}/var/getenv
RUN ln -snf ${API_SRC}/var/getenv /usr/local/bin

USER cisa
WORKDIR $CISA_HOME
CMD ["getenv"]
