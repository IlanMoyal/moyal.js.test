#!/bin/bash
set -e
mkdir -p packages
PACKFILE=$(npm pack)
mv "$PACKFILE" packages/
