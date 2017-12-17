#!/bin/bash

# Script for checking that Apache config for serving pre-compressed assets is working properly.

jsFile="http://www.react-starter.localhost/vendor.e1cafb2f73707a2b414e.js"

function check() {
  local url=$1
  local header=$2
  local mustNotHave=$3

  echo "checking $url"

  curl --silent --show-error \
    --head --request GET \
    --header "$header" \
    --resolve "www.react-starter.localhost:80:127.0.0.1" \
    "$url" \
    | grep "Alternates\|Content-*\|HTTP" \
    | grep --color "406 Not Acceptable\|Content-Encoding: gzip, gzip\|$mustNotHave\|$"

  echo ""
}

echo "js, without Accept-Encoding, may encode"
check "$jsFile" ""

echo "js, with Accept-Encoding: identity, must not encode"
check "$jsFile" "Accept-Encoding: identity" "gzip"

echo "js, with Accept-Encoding: gzip, should encode"
check "$jsFile" "Accept-Encoding: gzip"

echo "map, without Accept-Encoding, may encode"
check "$jsFile.map" ""

echo "map, with Accept-Encoding: identity, must not encode"
check "$jsFile.map" "Accept-Encoding: identity" "gzip"

echo "map, with Accept-Encoding: gzip, should encode"
check "$jsFile.map" "Accept-Encoding: gzip"
