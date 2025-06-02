/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-03 01:14:35
 * @FilePath: /lx_ytb/app/model/member.js
 * @description:
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MemberSchema = new Schema({
    name: { type: String, required: true },
    phone: {
      type: String, required: true,
    },
    birth: {
      type: String, required: false,
    },
    remark: { type: String, required: false },
    status: { type: Number, required: true, enum: [ 0, 1 ] },
    cardAmount: { type: Number, default: 0 }, // 本卡金额
    giftAmount: {
      type: Number, default: 0, // 赠送金额
    },
    allAmount: {
      type: Number, default: 0,
    },
    purchasesCount: {
      type: Number, required: true,
    },
    purchasesRecentDate: {
      type: String, required: false,
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

  return mongoose.model('Member', MemberSchema);
};
