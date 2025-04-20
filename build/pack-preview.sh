#!/bin/bash
set -e
rm -rf packages/preview
mkdir -p packages/preview
tar -xzf packages/*.tgz -C packages/preview
