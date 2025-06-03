/*
 * @Date: 2023-08-17 17:23:56
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-03 22:36:17
 * @FilePath: /lx_ytb/app/controller/card.js
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

  get memberService() {
    return this.service.member;
  }

  get cardService() {
    return this.service.card;
  }
  /**
   * @summary 创建开卡内容
   * @description 创建开卡内容
   * @Router POST /v1/purchaseCard
   * @Request header string authorization token
   * @Request body CreateMenu 参数
   */
  async buy() {
    const body = this.ctx.request.body;
    const { username } = this.ctx.userInfo;
    // 获取会员手机号以及要购买的卡
    const { phone, purchaseCardId } = body;

    // 查询会员信息
    const memberInfo = await this.memberService.findByPhone(phone);

    // 查询卡信息
    const {
      cardAmount,
      giftAmount,
      allAmount,
      solidCard,
      catEyes,
      artBuilding,
      upgradeNail,
      nailOrEye,
      coupon,
    } = await this.purchaseCardService.findById(purchaseCardId);


    // 更新会员信息卡余额次数等字段
    const res = await this.memberService.update(memberInfo._id, {
      cardAmount: cardAmount + memberInfo.cardAmount,
      giftAmount: giftAmount + memberInfo.giftAmount,
      allAmount: allAmount + memberInfo.allAmount,
      solidCard: solidCard + memberInfo.solidCard,
      catEyes: catEyes + memberInfo.catEyes,
      artBuilding: artBuilding + memberInfo.artBuilding,
      upgradeNail: upgradeNail + memberInfo.upgradeNail,
      nailOrEye: nailOrEye + memberInfo.nailOrEye,
      coupon: coupon + memberInfo.coupon,

    });

    // 购买卡数据库留存数据
    await this.cardService.create({
      ...body,
      operator: username,
      allAmount: allAmount + memberInfo.allAmount,
      status: 1,
    });

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
