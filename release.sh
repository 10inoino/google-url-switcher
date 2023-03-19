#!/bin/bash
mkdir release
cp -f manifest.json release/
cp -f index.js release/ 
cp -f 128.png release/
zip release.zip -r release
rm -rf release