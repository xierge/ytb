/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: 李鹏玺 2899952565@qq.com
 * @LastEditTime: 2023-06-10 22:28:41
 * @FilePath: /lx_ytb/app/controller/base.js
 * @description:
 */
/* eslint-disable no-useless-constructor */
'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  constructor(...args) {
    super(...args);
  }

  get userServive() {
    return this.service.user;
  }

  get subscribeService() {
    return this.service.subscribe;
  }

  setRes(data) {
    this.ctx.body = {
      code: 0,
      data,
      message: '请求成功',
      timestamp: Date.now(),
    };
  }

  setErrorRes(message) {
    this.ctx.body = {
      code: 1,
      message,
    };
  }
}


module.exports = BaseController;
