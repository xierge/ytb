'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  },

};
