#!/bin/bash

echo "*** KEY ***"
openssl rsa -check -noout -in ./ssl/react-starter.localhost.key

echo "*** CSR ***"
openssl req -verify -text -noout -in ./ssl/react-starter.localhost.csr

echo "*** CERTIFICATE ***"
openssl x509 -text -noout -in ./ssl/react-starter.localhost-selfsigned.crt
