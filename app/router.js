'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const mustLogin = app.middleware.auth(true);
  const tryLogin = app.middleware.auth(false);

  // -----------------------用户相关-----------------------
  // 注册
  router.post('/ytb/v1/user', controller.user.create);
  // 登录
  router.post('/ytb/v1/login', controller.user.login);
  // 退出登录
  router.post('/ytb/v1/logout', mustLogin, controller.user.logout);
  // 获取当前用户信息
  router.get('/ytb/v1/user', mustLogin, controller.user.getCurrentUser);
  // 获取用户信息
  router.get('/ytb/v1/user/:id', tryLogin, controller.user.getUser);
  // 修改用户信息
  router.put('/ytb/v1/user/:id', mustLogin, controller.user.update);
  // 删除用户
  router.delete('/ytb/v1/user/:id', controller.user.delete);

  // -----------------------订阅相关------------------------
  // 订阅用户
  router.post('/ytb/v1/subscribe', mustLogin, controller.subscribe.create);
  // 取消订阅
  router.delete('/ytb/v1/subscribe/:id', mustLogin, controller.subscribe.delete);
  // 获取用户订阅列表
  router.get('/ytb/v1/subscribe/:id', controller.subscribe.getSubscribe);


  // -----------------------aliyun-vod------------------------
  // 获取视频上传地址和凭证
  router.get('/ytb/v1/vod/createUploadVideo', controller.vod.createUploadVideo);
  // 刷新视频上传地址和凭证
  router.get('/ytb/v1/vod/refreshUploadVideo', controller.vod.refreshUploadVideo);
  // 获取音视频播放凭证
  router.get('/ytb/v1/vod/getVideoPlayAuth', controller.vod.getVideoPlayAuth);


  // -----------------------视频相关-----------------------------
  // 新增视频
  router.post('/ytb/v1/video', mustLogin, controller.video.createVideo);
  // 查看单个视频详情
  router.get('/ytb/v1/video/findOne/:id', tryLogin, controller.video.getVideo);
  // 获取视频列表
  router.get('/ytb/v1/video', tryLogin, controller.video.getVideos);
  // 获取发布人的视频列表
  router.get('/ytb/v1/video/getUserVideo/:userId', controller.video.getUserVideos);
  // 获取当前用户关注的视频列表
  router.get('/ytb/v1/video/getSubsribeVideos', mustLogin, controller.video.getSubsribeVideos);
  // 修改视频
  router.put('/ytb/v1/video/:id', mustLogin, controller.video.updateVideo);
  // 删除视频
  router.delete('/ytb/v1/video/:id', mustLogin, controller.video.deleteVideo);


  // -----------------------评论相关-----------------------------
  // 添加评论
  router.post('/ytb/v1/comment', mustLogin, controller.comment.create);
  // 获取评论列表
  router.get('/ytb/v1/comment/:videoId', mustLogin, controller.comment.getList);
  // 删除评论
  router.delete('/ytb/v1/comment/:id', mustLogin, controller.comment.delete);

  // -----------------------喜欢点赞相关-----------------------------
  // 视频喜欢
  router.post('/ytb/v1/like/like', mustLogin, controller.like.like);
  // 视频不喜欢
  router.post('/ytb/v1/like/dislike', mustLogin, controller.like.dislike);
  // 喜欢的视频列表
  router.get('/ytb/v1/like', mustLogin, controller.like.getList);

  // -----------------------todoList-----------------------------
  // 新增或修改计划
  router.post('/ytb/v1/todo', mustLogin, controller.todo.create);
  // 更改状态
  router.put('/ytb/v1/todo/changeStatus/:id', mustLogin, controller.todo.changeStatus);
  // 查看数据
  router.get('/ytb/v1/todo', mustLogin, controller.todo.getList);
  // 删除计划
  router.delete('/ytb/v1/todo/:id', mustLogin, controller.todo.delete);
};
