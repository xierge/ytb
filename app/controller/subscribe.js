/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

/**
 * @Controller Subscribe 订阅相关接口
 */
class SubscribeController extends BaseController {


  /**
   * @summary 获取订阅列表
   * @description 获取订阅列表
   * @Router GET /v1/subscribe/{id}
   * @Request header string authorization token
   * @Request query number pageSize 一页多少条
   * @Request query number pageNum 页码
   * @Response 200 subsciribeResponse ok
   */
  async getSubscribe() {
    const query = this.ctx.query;
    const { id } = this.ctx.params;
    const res = await this.subscribeService.findSenior({ user: id }, query);
    // if (res.length) {
    //   const users = res.map(subscribe => {
    //     return this.userServive.findById(subscribe.channel);
    //   });
    //   res = await Promise.all(users);
    // }
    this.setRes(res);
  }

  /**
   * @summary 订阅用户
   * @description 订阅用户
   * @Router POST /v1/subscribe
   * @Request header string *authorization token
   * @Request body subscribeUser 被订阅用户的id
   * @Response 200 baseResponse ok
   */
  async create() {
    this.ctx.validate({
      channel: {
        type: 'string',
      },
    }, this.ctx.request.body);
    const user = this.ctx.userInfo.userId;
    const { channel } = this.ctx.request.body;
    if (channel === user) this.ctx.throw(422, '用户不能订阅自己');
    let isSubscribe;
    try {
      isSubscribe = await this.subscribeService.find({ user, channel });
    } catch (error) {
      this.ctx.throw(422, '无此用户id');
    }
    if (isSubscribe) {
      this.ctx.throw(422, '已经订阅过此用户');
    }

    try {
      const userInfo = await this.userServive.findById(channel);
      await this.subscribeService.create({ user, channel });
      userInfo.subscribeCount++;
      await userInfo.save();
    } catch (error) {
      this.ctx.throw(500, error);
    }
    this.setRes();
  }


  /**
   * @summary 取消订阅
   * @description 取消订阅
   * @Router DELETE /v1/subscribe/{id}
   * @Request header string *authorization token
   * @Request path string id 取消订阅用户的id
   * @Response 200 baseResponse ok
   */
  async delete() {
    const currentId = this.ctx.userInfo.userId;
    const channel = this.ctx.params.id;
    let isSubscribe;
    try {
      isSubscribe = await this.subscribeService.find({ user: currentId, channel });
    } catch (error) {
      this.ctx.throw(422, '无此用户id');
    }
    if (!isSubscribe) this.ctx.throw(422, '未订阅此用户');

    try {
      const userInfo = await this.userServive.findById(channel);
      await isSubscribe.remove();
      userInfo.subscribeCount--;
      await userInfo.save();
    } catch (error) {
      this.ctx.throw(500, error);
    }
    this.setRes();
  }


}

module.exports = SubscribeController;
