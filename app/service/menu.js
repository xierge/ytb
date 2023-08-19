/*
 * @Date: 2023-04-09 15:33:21
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2023-08-19 13:15:05
 * @FilePath: /lx_ytb/app/service/menu.js
 * @description: menu
 */
const Service = require('egg').Controller;

class MenuService extends Service {
  get Menu() {
    return this.app.model.Menu;
  }

  async create(data) {
    const menu = new this.Menu(data);
    const res = await menu.save();
    return res;
  }

  async getList({ pageNum, pageSize, ...query }) {
    if (query.menuName) {
      query.menuName = new RegExp(`${query.menuName}`);
    }
    const getData = this.Menu.find(query)
      .sort({
        order: 1,
      })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize * 1);

    const getCount = this.Menu.countDocuments(query);
    const [ list, count ] = await Promise.all([ getData, getCount ]);
    return { list, count };
  }

  async update(id, data) {
    await this.findById(id);
    return this.Menu.findByIdAndUpdate(id, data);
  }

  delete(id) {
    return this.Menu.findByIdAndDelete(id);
  }

  async findById(id) {
    try {
      const res = await this.Menu.findById(id);
      return res;

    } catch (error) {
      this.ctx.throw(422, '不存在此菜单');
    }
  }
}


module.exports = MenuService;
