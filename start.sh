#!/bin/sh

set -ex
edgedb migrate
npm run start
