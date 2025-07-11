/*
 * @Date: 2023-08-17 17:24:50
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-28 16:58:24
 * @FilePath: /lx_ytb/app/model/goods.js
 * @description: menu 表
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const goodsSchema = new Schema({
    // 商品名称 || 商品类型
    goodsName: { type: String, required: false },
    // 卡类型 solid 纯色   style 款式  eyelashes 美睫  single 单项
    goodsType: { type: Schema.Types.ObjectId, require: false },

    order: {
      type: Number, default: 1,
    },
    normalPrice: { // 价格
      type: Number, default: 0,
    },
    memberPrice: { // 价格
      type: Number, default: 0,
    },
    isCoupon: {
      type: Boolean,
      default: false,
    },
  }, {
    timestamps: true,
  });

  return mongoose.model('Goods', goodsSchema);
};
