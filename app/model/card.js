
/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-03 22:36:26
 * @FilePath: /lx_ytb/app/model/card.js
 * @description:
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CardSchema = new Schema({
    phone: {
      type: String, required: true,
    },
    status: { type: Number, required: true, enum: [ 0, 1 ] },
    operator: {
      type: String, required: true,
    },
    purchaseCardId: {
      type: String, required: true,
    },
    allAmount: { // 剩余总金额
      type: Number, default: 0,
    },

  }, {
    timestamps: true,
  });

  return mongoose.model('Card', CardSchema);
};
