#!/usr/bin/env sh

git add .
git commit -m "auto commit by hexo-admin"
git push origion main

hexo g
hexo d
