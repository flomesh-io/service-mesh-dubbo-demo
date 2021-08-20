FROM flomesh/adoptopenjdk:8-alpine-slim

ARG JAR_FILE=target/date-service-v2.jar
COPY ${JAR_FILE} app.jar
COPY run.sh run.sh

RUN chmod +x run.sh

ENTRYPOINT ["/run.sh"]