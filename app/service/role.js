/*
 * @Date: 2023-04-09 15:33:21
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2023-08-17 19:16:09
 * @FilePath: /ytb/app/service/role.js
 * @description: role
 */
const Service = require('egg').Controller;

class RoleService extends Service {
  get Role() {
    return this.app.model.Role;
  }

  async create(data) {
    const role = new this.Role(data);
    const res = await role.save();
    return res;
  }

  async getList({ pageNum, pageSize, ...query }) {
    if (query.role_name) {
      query.role_name = new RegExp(`${query.role_name}`);
    }
    const getData = this.Role.find(query)
      .sort({
        createdAt: -1,
      })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize * 1);

    const getCount = this.Role.countDocuments(query);
    const [ list, count ] = await Promise.all([ getData, getCount ]);
    return { list, count };
  }

  async update(id, data) {
    await this.findById(id);
    return this.Role.findByIdAndUpdate(id, data);
  }

  delete(id) {
    return this.Role.findByIdAndDelete(id);
  }

  async findById(id) {
    try {
      const res = await this.Role.findById(id);
      return res;

    } catch (error) {
      this.ctx.throw(422, '不存在此角色');
    }
  }
}


module.exports = RoleService;
