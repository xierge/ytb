module.exports = {
  // 基础通用返回
  baseResponse: {
    code: {
      type: 'number',
      example: 10000,
      description: '状态码',
    },
    status: {
      type: 'string',
      description: '请求是否成功',
      example: '请求成功',
    },
    timestamp: {
      type: 'number',
      example: 166523626372,
    },
  },
  // 创建用户参数
  createUser: {
    username: {
      type: 'string',
      require: true,
      example: 'lpx',
    },
    email: {
      type: 'string',
      require: true,
      example: 'lpx@qq.com',
    },
    password: {
      type: 'string',
      require: true,
      example: 'lpx',
    },
  },
  // 创建用户成功返回
  createUserResponse: {
    code: {
      type: 'number',
      example: 10000,
      description: '状态码',
    },
    status: {
      type: 'string',
      description: '请求是否成功',
      example: '请求成功',
    },
    timestamp: {
      type: 'number',
      example: 166523626372,
    },
    data: {
      type: 'createUserData',
    },
  },
  // 登录的传参
  loginUser: {
    username: {
      type: 'string',
      require: true,
      example: 'lpx',
    },
    password: {
      type: 'string',
      require: true,
      example: 'lpx',
    },
  },
  // 登录成功后的返回
  loginUserResponse: {
    code: {
      type: 'number',
      example: 10000,
      description: '状态码',
    },
    status: {
      type: 'string',
      description: '请求是否成功',
      example: '请求成功',
    },
    timestamp: {
      type: 'number',
      example: 166523626372,
    },
    data: {
      type: 'loginData',
    },
  },
  // 请求头
  headers: {
    authorization: {
      type: 'string',
      example: '12312',
    },
  },
  // 获取用户信息
  getUserDetailResponse: {
    code: {
      type: 'number',
      example: 10000,
      description: '状态码',
    },
    status: {
      type: 'string',
      description: '请求是否成功',
      example: '请求成功',
    },
    timestamp: {
      type: 'number',
      example: 166523626372,
    },
    data: {
      type: 'createUserData',
    },
  },
  // 订阅用户参数
  subscribeUser: {
    channel: {
      type: 'string',
      example: '63328f52d55c07296f867689',
    },
  },
  // 订阅列表返回
  subsciribeResponse: {
    code: {
      type: 'number',
      example: 10000,
      description: '状态码',
    },
    status: {
      type: 'string',
      description: '请求是否成功',
      example: '请求成功',
    },
    timestamp: {
      type: 'number',
      example: 166523626372,
    },
    data: {
      type: 'array',
      itemType: 'subsciribeResponseItem',
    },
  },
  // 新增视频
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
  video: {
    title: {
      type: 'string',
      example: 'title',
      description: '标题',
    },
    description: {
      type: 'string',
      example: 'description',
      description: '描述',
    },
    vodVideoId: {
      type: 'string',
      description: '播放地址',
    },
    cover: {
      type: 'string',
      description: '封面地址',
    },
    user: {
      type: 'string',
      description: '用户id',
    },
  },
};
