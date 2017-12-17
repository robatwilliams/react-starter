#!/bin/bash
rm -rf deploy
mkdir -p deploy

cp -r dist/* deploy/

# Double-extension on uncompressed files for Apache Multiviews technique.
# See explanation in Apache config file.
cd deploy/
for f in *.html; do mv $f "$f.html"; done
for f in *.js; do mv $f "$f.js"; done
for f in *.map; do mv $f "$f.map"; done
cd -
