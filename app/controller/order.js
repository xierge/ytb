/*
 * @Date: 2023-08-17 17:23:56
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-15 01:46:40
 * @FilePath: /lx_ytb/app/controller/order.js
 * @description:
 */
/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

/**
 * @Controller Menu 菜单
 */
class GoodsController extends BaseController {
  get orderService() {
    return this.ctx.service.order;
  }

  get memberService() {
    return this.ctx.service.member;
  }


  /**
   * @summary 创建商品内容
   * @description 创建商品内容
   * @Router POST /v1/order
   * @Request body CreateMenu 参数
   */
  async create() {
    const body = this.ctx.request.body;

    let member;
    // 收益金额 对李安可见
    let profitAmount = 0;
    let freeAmount = 0;
    // 判断是否是会员
    if (body.phone) {
      // 查询用户信息 消耗卡金 优惠权益等
      member = await this.memberService.findByPhone(body.phone);

      Object.keys(body).forEach(key => {
        if (![ 'phone', 'name' ].includes(key)) {
          if (key === 'kj') {
            member.allAmount = member.allAmount - body.kj;
            if (member.giftAmount > body.kj) {
              member.giftAmount = member.giftAmount - body.kj;
              freeAmount = body.kj;
            } else if (Number(member.giftAmount) === 0) {
              member.cardAmount = member.cardAmount - body.kj;
              profitAmount += body.kj;
            } else {
              const restAmount = body.kj - member.giftAmount;
              member.giftAmount = 0;
              freeAmount = member.giftAmount;
              member.cardAmount = member.cardAmount - restAmount;
              profitAmount += restAmount;
            }
          } else if (key === 'mt') {
            profitAmount = ((profitAmount + body[key] * 0.92)).tofixed(2);
          } else if (body[key] && member[key]) {
            member[key] = member[key] - body[key];
          }
        }
      });

      await this.memberService.update(member._id, member);
    } else {
      Object.keys(body).forEach(key => {
        if (![ 'mt', 'xj' ].includes(key)) {
          if (key === 'mt') {
            profitAmount = ((profitAmount + body[key] * 0.92)).tofixed(2);
          } else {
            profitAmount = (profitAmount + body[key]).tofixed(2);
          }
        }
      });
    }

    // 创建订单
    const res = await this.orderService.create({ ...body, profitAmount, freeAmount });


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
    const res = await this.orderService.getList();
    this.setRes(res);
  }


}

module.exports = GoodsController;
