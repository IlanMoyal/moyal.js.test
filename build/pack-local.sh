#!/bin/bash
set -e
mkdir -p packages
PACKFILE=$(npm pack --ignore-scripts) # --ignore-scripts ensures that here, pack wil not trigger prepack script
mv "$PACKFILE" packages/
