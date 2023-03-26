#!/bin/bash
rm -rf release
mkdir release
cp -f manifest.json release/
cp -f index.js release/ 
cp -f 128.png release/
cp -f 32.png release/
cp -f popup/dist/index.html release/
cp -f popup/dist/main.js release/