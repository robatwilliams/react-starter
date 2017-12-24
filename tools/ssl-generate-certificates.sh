#!/bin/bash

mkdir -p ssl

# TODO include www. subdomain

# generate:
# - private key (unencrypted)
# - Certificate Signing Request (SHA-256 signed), which includes the public key
openssl req \
  -newkey rsa:2048 \
  -nodes \
  -sha256 \
  -keyout ./ssl/react-starter.localhost.key \
  -out ./ssl/react-starter.localhost.csr \
  -subj "//C=GB\ST=Tyne and Wear\L=Newcastle upon Tyne\O=Robat Williams\OU=react-starter\CN=react-starter.localhost"

# generate self-signed certificate
openssl x509 \
  -req \
  -days 30 \
  -signkey ./ssl/react-starter.localhost.key \
  -in ./ssl/react-starter.localhost.csr \
  -out ./ssl/react-starter.localhost-selfsigned.crt
