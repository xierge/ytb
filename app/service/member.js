/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-03 00:58:12
 * @FilePath: /lx_ytb/app/service/member.js
 * @description: user相关
 */
const Service = require('egg').Controller;
class MemberService extends Service {
  get Member() {
    return this.app.model.Member;
  }

  async createMember(data) {
    const user = new this.Member({ ...data, status: 1, purchasesCount: 0, purchasesRecentDate: '' });
    const res = await user.save();
    return res;
  }


  findByPhone(phone) {
    return this.Member.findOne({
      phone,
    });
  }

  /**
   * 查询会员列表
   * @param root0
   * @param root0.pageNum 页码
   * @param root0.pageSize 个数
   */
  async getList({ pageNum, pageSize, ...query }) {
    if (query.phone) {
      query.phone = new RegExp(`${query.phone}`);
    } else {
      delete query.phone;
    }
    const getData = this.Member.find(query)
      .sort({
        createdAt: -1,
      })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize * 1);

    const getCount = this.Member.countDocuments(query);
    const [ list, count ] = await Promise.all([ getData, getCount ]);
    return { list, count, pageNum, pageSize, query };
  }


  findByMembername(name) {
    return this.Member.findOne({
      name,
    }).select('+password');
  }

  findByEmail(email) {
    return this.Member.findOne({
      email,
    }).select('+password');
  }


  findById(id) {
    return this.Member.findById(id);
  }


  valideMember(data) {
    return this.Member.findOne(data);
  }


  update(id, data) {
    return this.Member.findByIdAndUpdate(id, data);
  }

  delete(id) {
    return this.Member.findByIdAndDelete(id);
  }


}


module.exports = MemberService;
