/*
 * @Date: 2023-08-17 17:24:50
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2023-08-19 10:28:40
 * @FilePath: /lx_ytb/app/model/role.js
 * @description: role表
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const roleSchema = new Schema({
    roleName: { type: String, required: true },
    description: { type: String },
    menu: {
      type: String, default: '',
    },
    operator: {
      type: String,
    },
    status: { type: Number, default: 0 }, // 伪删除  0:未删除 1:已删除
  }, {
    timestamps: true,
  });

  return mongoose.model('Role', roleSchema);
};
