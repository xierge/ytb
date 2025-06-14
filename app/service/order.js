/*
 * @Date: 2023-04-09 15:33:21
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-15 00:45:05
 * @FilePath: /lx_ytb/app/service/order.js
 * @description: goods
 */
const Service = require('egg').Controller;

class OrderService extends Service {
  get Order() {
    return this.app.model.Order;
  }

  // 创建商品
  async create(data) {
    const goods = new this.Order(data);
    const res = await goods.save();
    return res;
  }


  async getList() {
    const getData = this.Order.find();
    const getCount = this.Order.countDocuments();
    const [ list, count ] = await Promise.all([ getData, getCount ]);
    return { list, count };
  }


  findById(id) {
    return this.Order.findById(id);
  }

  async update(id, data) {
    await this.findById(id);
    return this.Order.findByIdAndUpdate(id, data);
  }

  delete(id) {
    return this.Order.findByIdAndDelete(id);
  }
}


module.exports = OrderService;
