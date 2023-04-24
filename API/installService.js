const Service = require('node-windows').Service;
require('dotenv').config();

const scriptPath = process.env.APP_PATH;

const svc = new Service({
  name: process.env.SERVICE_NAME,
  description: process.env.SERVICE_DESCRIPTION,
  script: scriptPath,
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

svc.on('install', () => {
  svc.start();
});

svc.install();
