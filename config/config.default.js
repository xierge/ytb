/*
 * @Date: 2023-08-17 23:29:51
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-05-30 00:07:44
 * @FilePath: /lx_ytb/config/config.default.js
 * @description:
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  console.log(process.env);
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1661096858346_6640';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // add your user config here
  const userConfig = {
    myAppName: 'egg',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://47.98.217.142:27017/sweet',
      options: {
        auth: { authSource: 'admin' },
        user: 'admin',
        pass: 'lpx666888',
        useUnifiedTopology:true
      },
      // mongoose global plugins, expected a function or an array of function and options
      plugins: [],
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };

  config.jwt = {
    secret: 'd4638f9e-af3c-456b-bd26-ab13e54f41c8',
    expiresIn: '1d',
  };

  exports.redis = {
    client: {
      port: 6379, // Redis port
      host: '47.98.217.142', // Redis host
      password: 'lpx666888',
      db: 0,
    },
  };

  config.multipart = {
    mode: 'file',
    fileSize: '50mb',
    fileExtensions: [ '.foo', '.apk', '.mov' ],
  };

  config.swaggerdoc = {
    dirScanner: './app/controller',
    basePath: '/ytb',
    apiInfo: {
      title: 'lx_ytb',
      description: 'lsq-lpx',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    securityDefinitions: {
      apikey: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    enableSecurity: false,
    // enableValidate: true,
    routerMap: false,
    enable: true,
  };

  config.cors = {
    origin: '*',
  };

  return {
    ...config,
    ...userConfig,
  };
};
