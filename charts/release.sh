#!/bin/sh
RELEASE_DIR=../release
RELEASE_TPL_DIR=${RELEASE_DIR}/dubbo-mesh/templates
RELEASE_ARTIFACTS_DIR=${RELEASE_DIR}/artifacts



echo "Deleting old YAMLs ..."
rm -fv ${RELEASE_TPL_DIR}/*.yaml
rm -fv ${RELEASE_ARTIFACTS_DIR}/deployment.yaml
rm -fv ${RELEASE_ARTIFACTS_DIR}/proxy-profile.yaml

echo "Generating YAMLs ..."
helm template --dry-run --debug --output-dir ${RELEASE_DIR} dubbo-mesh

echo "Releasing ProxyProfile YAML ..."
cat ${RELEASE_TPL_DIR}/proxy-profile-*.yaml > ${RELEASE_ARTIFACTS_DIR}/proxy-profile.yaml


echo "Releasing Deployment YAML ..."
mkdir -p ${RELEASE_ARTIFACTS_DIR}
cat ${RELEASE_TPL_DIR}/namespace.yaml \
    ${RELEASE_TPL_DIR}/configmap-*.yaml \
    ${RELEASE_TPL_DIR}/deployment-*.yaml \
    ${RELEASE_TPL_DIR}/service-*.yaml \
    ${RELEASE_TPL_DIR}/canary-router.yaml \
    ${RELEASE_TPL_DIR}/ingress.yaml > ${RELEASE_ARTIFACTS_DIR}/deployment.yaml