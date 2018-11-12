#!/usr/bin/env bash

yarn
yarn build
rm -rf /tmp/dist
cp -r dist /tmp
git checkout gh-pages
cp -r /tmp/dist/* .
git add .
git commit -m "New version"
