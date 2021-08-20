{{/*
Expand the name of the chart.
*/}}
{{- define "dubbo-mesh.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "dubbo-mesh.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "dubbo-mesh.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "dubbo-mesh.labels" -}}
helm.sh/chart: {{ include "dubbo-mesh.chart" . }}
{{ include "dubbo-mesh.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "dubbo-mesh.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
{{- end }}

{{/*
Logger Common labels
*/}}
{{- define "dubbo-mesh.logger.labels" -}}
helm.sh/chart: {{ include "dubbo-mesh.chart" . }}
{{ include "dubbo-mesh.logger.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Logger Selector labels
*/}}
{{- define "dubbo-mesh.logger.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/instance: poc-logger
{{- end }}

{{/*
Mock Common labels
*/}}
{{- define "dubbo-mesh.mock.labels" -}}
helm.sh/chart: {{ include "dubbo-mesh.chart" . }}
{{ include "dubbo-mesh.mock.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Mock Selector labels
*/}}
{{- define "dubbo-mesh.mock.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/instance: poc-mock
{{- end }}


{{/*
Dubbo Consumer Service v1 Common labels
*/}}
{{- define "dubbo-mesh.consumer-service-v1.labels" -}}
helm.sh/chart: {{ include "dubbo-mesh.chart" . }}
{{ include "dubbo-mesh.consumer-service-v1.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Dobbo Consumer Service1 v2Selector labels
*/}}
{{- define "dubbo-mesh.consumer-service-v1.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/instance: {{ .Values.consumerV1.service.name }}
app.kubernetes.io/protocol: http
app.kubernetes.io/canary: v1
{{- end }}

{{/*
Dubbo Consumer Service v2 Common labels
*/}}
{{- define "dubbo-mesh.consumer-service-v2.labels" -}}
helm.sh/chart: {{ include "dubbo-mesh.chart" . }}
{{ include "dubbo-mesh.consumer-service-v2.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Dobbo Consumer Service v2 Selector labels
*/}}
{{- define "dubbo-mesh.consumer-service-v2.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/instance: {{ .Values.consumerV2.service.name }}
app.kubernetes.io/protocol: http
app.kubernetes.io/canary: v2
{{- end }}

{{/*
Dubbo Hello Service v1 Common labels
*/}}
{{- define "dubbo-mesh.hello-service-v1.labels" -}}
helm.sh/chart: {{ include "dubbo-mesh.chart" . }}
{{ include "dubbo-mesh.hello-service-v1.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Dobbo Hello Service v1 Selector labels
*/}}
{{- define "dubbo-mesh.hello-service-v1.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/instance: {{ .Values.helloV1.service.name }}
app.kubernetes.io/protocol: dubbo
app.kubernetes.io/canary: v1
{{- end }}

{{/*
Dubbo Hello Service v2 Common labels
*/}}
{{- define "dubbo-mesh.hello-service-v2.labels" -}}
helm.sh/chart: {{ include "dubbo-mesh.chart" . }}
{{ include "dubbo-mesh.hello-service-v2.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Dobbo Hello Service v2 Selector labels
*/}}
{{- define "dubbo-mesh.hello-service-v2.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/instance: {{ .Values.helloV2.service.name }}
app.kubernetes.io/protocol: dubbo
app.kubernetes.io/canary: v2
{{- end }}


{{/*
Dubbo Date Service v1 Common labels
*/}}
{{- define "dubbo-mesh.date-service-v1.labels" -}}
helm.sh/chart: {{ include "dubbo-mesh.chart" . }}
{{ include "dubbo-mesh.date-service-v1.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Dobbo Date Service v1 Selector labels
*/}}
{{- define "dubbo-mesh.date-service-v1.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/instance: {{ .Values.dateV1.service.name }}
app.kubernetes.io/protocol: dubbo
app.kubernetes.io/canary: v1
{{- end }}

{{/*
Dubbo Date Service v2 Common labels
*/}}
{{- define "dubbo-mesh.date-service-v2.labels" -}}
helm.sh/chart: {{ include "dubbo-mesh.chart" . }}
{{ include "dubbo-mesh.date-service-v2.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Dobbo Date Service v2 Selector labels
*/}}
{{- define "dubbo-mesh.date-service-v2.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/instance: {{ .Values.dateV2.service.name }}
app.kubernetes.io/protocol: dubbo
app.kubernetes.io/canary: v2
{{- end }}


{{/*
Dubbo Time Service v1 Common labels
*/}}
{{- define "dubbo-mesh.time-service-v1.labels" -}}
helm.sh/chart: {{ include "dubbo-mesh.chart" . }}
{{ include "dubbo-mesh.time-service-v1.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Dobbo Time Service v1 Selector labels
*/}}
{{- define "dubbo-mesh.time-service-v1.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/instance: {{ .Values.timeV1.service.name }}
app.kubernetes.io/protocol: dubbo
app.kubernetes.io/canary: v1
{{- end }}

{{/*
Dubbo Time Service v2 Common labels
*/}}
{{- define "dubbo-mesh.time-service-v2.labels" -}}
helm.sh/chart: {{ include "dubbo-mesh.chart" . }}
{{ include "dubbo-mesh.time-service-v2.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Dobbo Time Service v2 Selector labels
*/}}
{{- define "dubbo-mesh.time-service-v2.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/instance: {{ .Values.timeV2.service.name }}
app.kubernetes.io/protocol: dubbo
app.kubernetes.io/canary: v2
{{- end }}


{{/*
Zookeeper Service Common labels
*/}}
{{- define "dubbo-mesh.zookeeper-service.labels" -}}
helm.sh/chart: {{ include "dubbo-mesh.chart" . }}
{{ include "dubbo-mesh.zookeeper-service.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Zookeeper Service Selector labels
*/}}
{{- define "dubbo-mesh.zookeeper-service.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/instance: {{ .Values.zookeeper.service.name }}
{{- end }}

{{/*
Dobbo Service Selector labels
*/}}
{{- define "dubbo-mesh.dubbo.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/protocol: dubbo
{{- end }}

{{/*
HTTP Service Selector labels
*/}}
{{- define "dubbo-mesh.http.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dubbo-mesh.name" . }}
app.kubernetes.io/protocol: http
{{- end }}


{{- define "dubbo-mesh.mock.host" -}}
{{- if eq "vm" .Values.mock.mode }}
{{- .Values.mock.vm.ip }}
{{- else }}
{{- printf "%s.%s.svc" .Values.mock.service.name .Values.namespace }}
{{- end }}
{{- end }}

{{- define "dubbo-mesh.metrics.url" -}}
{{- $mockHost := include "dubbo-mesh.mock.host" . -}}
{{- $metricsPort := .Values.mock.service.port.metrics | toString -}}
{{ printf "http://%s:%s/services/$(PIPY_SERVICE_NAME)/metrics" $mockHost $metricsPort }}
{{- end }}

{{- define "dubbo-mesh.config.url" -}}
{{- $mockHost := include "dubbo-mesh.mock.host" . -}}
{{- $configPort := .Values.mock.service.port.metrics | toString -}}
{{ printf "http://%s:%s/services/$(PIPY_SERVICE_NAME)/config" $mockHost $configPort }}
{{- end }}