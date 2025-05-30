/*
 * @Date: 2023-07-26 18:39:29
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-05-30 00:45:24
 * @FilePath: /lx_ytb/app/router.js
 * @description:
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const mustLogin = app.middleware.auth(true);
  // const tryLogin = app.middleware.auth(false);

  // -----------------------用户相关-----------------------
  // 注册
  router.post('/sweet/createUser', controller.user.create);
  // 登录
  router.post('/sweet/login', controller.user.login);
  // 退出登录
  router.post('/ytb/v1/logout', mustLogin, controller.user.logout);
  // 获取当前用户信息
  router.get('/sweet/getUserInfo', mustLogin, controller.user.getUserInfo);

  // 修改用户信息
  router.put('/ytb/v1/user/:id', mustLogin, controller.user.update);
  // 删除用户
  router.delete('/ytb/v1/user/:id', controller.user.delete);
  // 获取图形验证码
  router.get('/ytb/v1/captcha', controller.user.captcha);


  // 登录 区分管理员
};
