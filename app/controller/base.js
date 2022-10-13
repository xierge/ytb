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

  setRes(data, status = '请求成功', code = 100000) {
    this.ctx.body = {
      code,
      data,
      status,
      timestamp: Date.now(),
    };
  }
}


module.exports = BaseController;
