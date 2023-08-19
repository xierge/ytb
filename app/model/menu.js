/*
 * @Date: 2023-08-17 17:24:50
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2023-08-19 13:10:56
 * @FilePath: /lx_ytb/app/model/menu.js
 * @description: menu 表
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const menuSchema = new Schema({
    menuName: { type: String, required: true },
    path: {
      type: String, default: '',
    },
    menuType: {
      type: String, default: 'M',
    },
    perm: { type: String, default: '' },
    order: {
      type: Number, default: 1,
    },
    operator: {
      type: String,
    },
    status: { type: Number, default: 0 }, // 伪删除  0:未删除 1:已删除
    pid: {
      type: String, default: '0',
    },
  }, {
    timestamps: true,
  });

  return mongoose.model('Menu', menuSchema);
};
