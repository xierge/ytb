module.exports = {
  // 创建todo任务
  CreateTodo: {
    id: {
      type: 'long',
      example: 123,
      description: '唯一ID',
    },
    title: {
      type: 'string',
      example: '学习',
      description: '标题',
    },
    Description: {
      type: 'string',
      example: '学习vue',
      description: '具体内容描述',
    },
    dtime: {
      type: 'Long',
      example: 123,
      description: '计划做的时间',
    },
  },

};
