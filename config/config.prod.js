/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2023-08-17 02:58:14
 * @FilePath: /lx_ytb/config/config.prod.js
 * @description:
 */
exports.vod = {
  accessKeyId: process.env.accessKeyId,
  accessKeySecret: process.env.accessKeySecret,
};


exports.redis = {
  client: {
    port: 6379, // Redis port
    host: '47.98.217.142', // Redis host
    password: 'lpx666888',
    db: 0,
  },
};


exports.mongoose = {
  client: {
    url: 'mongodb://47.98.217.142:27017/youtube',
    options: {
      useUnifiedTopology: true,
    },
    // mongoose global plugins, expected a function or an array of function and options
    plugins: [],
  },
};
