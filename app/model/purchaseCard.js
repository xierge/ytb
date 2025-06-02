/*
 * @Date: 2023-08-17 17:24:50
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-02 22:06:03
 * @FilePath: /lx_ytb/app/model/purchaseCard.js
 * @description: menu 表
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const purchaseCardSchema = new Schema({
    // 卡名称
    cardName: { type: String, required: true },
    // 卡类型 StoredCard 储值卡   SecondaryCard 次卡  GiftCard 礼包
    cardType: { type: String, required: true, enum: [ 'storedCard', 'secondaryCard', 'giftCard' ] },
    cardAmount: { type: Number, default: 0 }, // 本卡金额
    giftAmount: {
      type: Number, default: 0, // 赠送金额
    },
    allAmount: {
      type: Number, default: 0,
    },
    order: {
      type: Number, default: 1,
    },
    status: { type: Number, required: true, enum: [ 0, 1 ], default: 1 }, // 伪删除  1:未删除 0:已删除
    price: { // 价格
      type: Number, default: 0,
    },
    solidCard: { // 纯色
      type: Number, default: 0,
    },
    catEyes: { // 猫眼
      type: Number, default: 0,
    },
    artBuilding: { // 建构
      type: Number, default: 0,
    },
    upgradeNail: { // 升级甲油胶
      type: Number, default: 0,
    },
    nailOrEye: { // 美甲或睫毛
      type: Number, default: 0,
    },
    // 50元优惠券
    coupon: {
      type: Number, default: 0,
    },
  }, {
    timestamps: true,
  });

  return mongoose.model('PurchaseCard', purchaseCardSchema);
};
