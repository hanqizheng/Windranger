'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1550028297526_137';

  // add your config here
  config.middleware = [];

  config.cluster = {
    listen: {
      port: 1234,
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
