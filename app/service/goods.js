/*
 * @Date: 2023-04-09 15:33:21
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-21 11:59:49
 * @FilePath: /lx_ytb/app/service/goods.js
 * @description: goods
 */
const Service = require('egg').Controller;

class GoodsService extends Service {
  get Goods() {
    return this.app.model.Goods;
  }

  // 创建商品
  async create(data) {
    const goods = new this.Goods(data);
    const res = await goods.save();
    return res;
  }


  // 获取商品列表
  async getList() {
    const getData = this.Goods.find().sort({
      order: 1,
    });
    const list = await getData;
    return { list };
  }


  findById(id) {
    return this.Goods.findById(id);
  }


  async update(id, data) {
    await this.findById(id);
    return this.Goods.findByIdAndUpdate(id, data);
  }

  delete(id) {
    return this.Goods.findByIdAndDelete(id);
  }
}


module.exports = GoodsService;
