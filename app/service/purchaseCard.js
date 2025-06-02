/*
 * @Date: 2023-04-09 15:33:21
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-02 22:16:52
 * @FilePath: /lx_ytb/app/service/purchaseCard.js
 * @description: purchaseCard
 */
const Service = require('egg').Controller;

class PurchaseCardService extends Service {
  get PurchaseCard() {
    return this.app.model.PurchaseCard;
  }

  // 创建开卡选项
  async create(data) {
    const purchaseCard = new this.PurchaseCard(data);
    const res = await purchaseCard.save();
    return res;
  }

  async getList() {
    const getData = this.PurchaseCard.find({ status: 1 });
    const getCount = this.PurchaseCard.countDocuments({ status: 1 });
    const [ list, count ] = await Promise.all([ getData, getCount ]);
    return { list, count };
  }

  async update(id, data) {
    await this.findById(id);
    return this.PurchaseCard.findByIdAndUpdate(id, data);
  }

  delete(id) {
    return this.PurchaseCard.findByIdAndDelete(id);
  }
}


module.exports = PurchaseCardService;
