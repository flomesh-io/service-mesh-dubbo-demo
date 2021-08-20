#!/bin/sh

java -javaagent:../agent/opentelemetry-javaagent-all-1.3.1.jar \
  -Dotel.traces.exporter=zipkin \
  -Dotel.exporter.zipkin.endpoint=http://127.0.0.1:9411/api/v2/spans \
  -Dotel.metrics.exporter=none \
  -Dotel.propagators=b3multi,jaeger \
  -Dotel.resource.attributes="service.name=time-service" \
  -Dotel.javaagent.debug=true \
  -Dotel.traces.sampler=parentbased_always_on \
  -Djava.security.egd=file:/dev/./urandom \
  -jar target/time-service.jar