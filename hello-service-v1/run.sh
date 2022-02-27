#!/bin/sh

proxychains4 -f /proxychains/proxychains.conf \
  java -javaagent:/opentelemetry-javaagent.jar \
  -Dotel.traces.exporter=logging \
  -Dotel.metrics.exporter=none \
  -Dotel.propagators=tracecontext,baggage,b3multi \
  -Dotel.resource.attributes="service.name=hello-service" \
  -Dotel.javaagent.debug=false \
  -Djava.security.egd=file:/dev/./urandom \
  -jar /app.jar