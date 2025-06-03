/*
 * @Date: 2023-04-09 15:33:21
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-03 22:34:04
 * @FilePath: /lx_ytb/app/service/card.js
 * @description: purchaseCard
 */
const Service = require('egg').Controller;

class CardService extends Service {
  get Card() {
    return this.app.model.Card;
  }

  // 创建开卡选项 toC
  async create(data) {
    const purchaseCard = new this.Card(data);
    const res = await purchaseCard.save();
    return res;
  }

  async getList() {
    const getData = this.Card.find({ status: 1 });
    const getCount = this.Card.countDocuments({ status: 1 });
    const [ list, count ] = await Promise.all([ getData, getCount ]);
    return { list, count };
  }


  findById(id) {
    return this.Card.findById(id);
  }


  async update(id, data) {
    await this.findById(id);
    return this.Card.findByIdAndUpdate(id, data);
  }

  delete(id) {
    return this.Card.findByIdAndDelete(id);
  }
}


module.exports = CardService;
