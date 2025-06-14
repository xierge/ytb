/*
 * @Date: 2023-08-17 17:24:50
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-15 01:38:27
 * @FilePath: /lx_ytb/app/model/order.js
 * @description: menu 表
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const orderSchema = new Schema({
    name: { type: String, required: false },
    phone: {
      type: String, required: false,
    },
    orderType: { type: Number, default: 1 }, // 1开单 2开卡
    profitAmount: { type: Number, default: 0 }, // 收益金额
    freeAmount: { type: Number, default: 0 }, // 免费金额
    realPrice: { type: Number, default: 0 }, // 实付消费
    dy: { type: Number, default: 0 }, // 抖音
    mt: { type: Number, default: 0 }, // 美团
    kj: { type: Number, default: 0 }, // 卡金
    xj: { type: Number, default: 0 }, // 现金
    cardAmount: { type: Number, default: 0 }, // 本卡金额
    giftAmount: {
      type: Number, default: 0, // 赠送金额
    },
    allAmount: {
      type: Number, default: 0,
    },
    solidCard: { // 纯色
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

  return mongoose.model('Order', orderSchema);
};
