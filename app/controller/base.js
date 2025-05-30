/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-05-30 22:02:13
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
      success: true,
    };
  }

  setErrorRes(message) {
    this.ctx.body = {
      success: false,
      code: 1,
      message,
    };
  }
}


module.exports = BaseController;
