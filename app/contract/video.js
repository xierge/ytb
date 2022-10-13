module.exports = {
  // 视频新增的参数
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
