FROM flomesh/adoptopenjdk:8-ubuntu-slim

ARG JAR_FILE=target/time-service-v1.jar
COPY ${JAR_FILE} app.jar
COPY run.sh run.sh

RUN chmod +x run.sh

ENTRYPOINT ["/run.sh"]