proxychains4 -f /proxychains/proxychains.conf \
  java -javaagent:/opentelemetry-javaagent-all.jar \
  -Dotel.traces.exporter=logging \
  -Dotel.metrics.exporter=none \
  -Dotel.propagators=tracecontext,baggage,b3multi \
  -Dotel.javaagent.debug=false \
  -Dotel.resource.attributes="service.name=$(_pod_serviceName),service.namespace={{ .Values.namespace }},service.instance.id=$(_pod_name)" \
  -Dotel.traces.sampler=parentbased_always_on \
  -Xms512m -Xmx2048m \
  -Djava.security.egd=file:/dev/./urandom \
  -jar /app.jar