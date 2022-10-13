module.exports = {
  createUserData: {
    username: {
      type: 'string',
      example: 'lpx',
    },
    email: {
      type: 'string',
      example: 'lpx@qq.com',
    },
    channelDescription: {
      type: 'string',
      example: null,
    },
    avatar: {
      type: 'string',
      example: null,
    },
    cover: {
      type: 'string',
      example: null,
    },
    _id: {
      type: 'string',
      example: '633293c44c66fa32ace97dcb',
    },
    subscribeCount: {
      type: 'number',
      example: 0,
    },
  },
  loginData: {
    username: {
      type: 'string',
      example: 'lpx',
    },
    email: {
      type: 'string',
      example: 'lpx@qq.com',
    },
    channelDescription: {
      type: 'string',
      example: null,
    },
    avatar: {
      type: 'string',
      example: null,
    },
    subscribeCount: {
      type: 'number',
      example: 0,
    },
    token: {
      type: 'string',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzMyOGRlNThhZmE5MDI4ZWFkYTQwNjEiLCJpYXQiOjE2NjQyNzc5NzcsImV4cCI6MTY2NDM2NDM3N30.Tm_kg3U71-6kAQMkLqFBAh1pfyENyKX_1AzsHQABtmQ',
    },
  },
  // 订阅列表
  subsciribeResponseItem: {
    username: {
      type: 'string',
      example: 'lpx',
    },
    cover: {
      type: 'string',
      example: null,
    },
    _id: {
      type: 'string',
      example: '633293c44c66fa32ace97dcb',
    },
  },
};
