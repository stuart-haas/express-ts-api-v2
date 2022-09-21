#!/bin/bash

chmod -R 777 node_modules

npm install

npm run build
 
chmod +x ./dist/cli/index.js

npx sequelize-cli db:migrate

npm run dev
