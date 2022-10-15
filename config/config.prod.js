exports.vod = {
  accessKeyId: process.env.accessKeyId,
  accessKeySecret: process.env.accessKeySecret,
};


exports.redis = {
  client: {
    port: 6376, // Redis port
    host: '47.98.217.142', // Redis host
    password: 'lpx666888',
    db: 0,
  },
};


exports.mongoose = {
  client: {
    url: 'mongodb://47.98.217.142:27017/youtobe',
    options: {
      useUnifiedTopology: true,
    },
    // mongoose global plugins, expected a function or an array of function and options
    plugins: [],
  },
};
