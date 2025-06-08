/*
 * @Date: 2023-08-17 17:23:56
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-07 17:36:16
 * @FilePath: /lx_ytb/app/controller/goods.js
 * @description:
 */
/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

/**
 * @Controller Menu 菜单
 */
class GoodsController extends BaseController {
  get goodsService() {
    return this.ctx.service.goods;
  }


  /**
   * @summary 创建商品内容
   * @description 创建商品内容
   * @Router POST /v1/goods
   * @Request body CreateMenu 参数
   */
  async create() {
    const body = this.ctx.request.body;
    const res = await this.goodsService.create({ ...body });
    this.setRes(res);
  }


  /**
   * @summary 查看商品数据
   * @description 查看商品数据
   * @Router GET /v1/goods/list
   * @Request header string authorization token
   */
  async list() {
    // const { userId } = this.ctx.userInfo;
    const res = await this.goodsService.getList();
    this.setRes(res);
  }


}

module.exports = GoodsController;
