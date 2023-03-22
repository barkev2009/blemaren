#!/bin/bash

cd client
npm i
npm run build
nohup serve -s build &