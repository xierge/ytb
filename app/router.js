/*
 * @Date: 2023-07-26 18:39:29
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-02 22:16:35
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

  // --------------------系统用户相关-----------------------
  // 注册
  router.post('/sweet/createUser', controller.user.create);
  // 登录
  router.post('/sweet/login', controller.user.login);
  // 退出登录
  router.post('/sweet/logout', mustLogin, controller.user.logout);
  // 获取当前用户信息
  router.get('/sweet/getUserInfo', mustLogin, controller.user.getUserInfo);

  // // 修改用户信息
  // router.put('/ytb/v1/user/:id', mustLogin, controller.user.update);
  // // 删除用户
  // router.delete('/ytb/v1/user/:id', controller.user.delete);
  // // 获取图形验证码
  // router.get('/ytb/v1/captcha', controller.user.captcha);

  // --------------------会员相关-----------------------
  // 创建会员
  router.post('/sweet/member/create', controller.member.create);

  // 创建会员
  router.get('/sweet/member/list', controller.member.list);


  // --------------------开卡相关-----------------------
  // 开卡后台管理相关
  router.post('/sweet/purchaseCard/tob/create', mustLogin, controller.purchaseCard.create);


  // 开卡c端相关


  // 开卡双端通用接口
  router.get('/sweet/purchaseCard/list', controller.purchaseCard.list);

};
