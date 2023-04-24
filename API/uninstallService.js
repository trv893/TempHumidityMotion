const Service = require('node-windows').Service;
require('dotenv').config();

const svc = new Service({
  name: process.env.SERVICE_NAME,
  script: process.env.APP_PATH
});

svc.on('uninstall', () => {
  console.log('Uninstall complete.');
  console.log('The service exists: ', svc.exists);
});

svc.uninstall();
