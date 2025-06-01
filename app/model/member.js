/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-01 22:26:37
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
    purchasesCount: {
      type: Number, required: true,
    },
    purchasesRecentDate: {
      type: String, required: false,
    },

  }, {
    timestamps: true,
  });

  return mongoose.model('Member', MemberSchema);
};
