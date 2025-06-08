/*
 * @Date: 2023-08-17 17:23:56
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-07 17:35:16
 * @FilePath: /lx_ytb/app/controller/purchaseCard.js
 * @description:
 */
/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

/**
 * @Controller Menu 菜单
 */
class PurchaseCardController extends BaseController {
  get purchaseCardService() {
    return this.ctx.service.purchaseCard;
  }


  /**
   * @summary 创建开卡内容
   * @description 创建开卡内容
   * @Router POST /v1/purchaseCard
   * @Request header string authorization token
   * @Request body CreateMenu 参数
   */
  async create() {
    const body = this.ctx.request.body;
    const { username } = this.ctx.userInfo;
    const res = await this.purchaseCardService.create({ ...body, operator: username, status: 1 });
    this.setRes(res);
  }


  /**
   * @summary 查看卡数据
   * @description 查看卡数据
   * @Router GET /v1/purchaseCard/list
   * @Request header string authorization token
   */
  async list() {
    // const { userId } = this.ctx.userInfo;
    const res = await this.purchaseCardService.getList();
    this.setRes(res);
  }


}

module.exports = PurchaseCardController;
