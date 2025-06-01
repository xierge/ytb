/*
 * @Date: 2025-06-01 21:07:10
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-01 21:59:36
 * @FilePath: /lx_ytb/app/controller/member.js
 * @description:
 */
/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');


/**
 * @Controller User 用户相关接口
 */
class UserController extends BaseController {
  get memberService() {
    return this.service.member;
  }


  /**
   * @summary 创建会员
   * @description 创建用户
   * @Router POST /sweet/createMember
   * @Request body createMember 创建用户的参数
   * @Response 200 createUserResponse ok
   */
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    const memberService = this.service.member;

    ctx.validate({
      phone: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
    });

    if (await memberService.findByPhone(body.phone)) {
      ctx.throw(422, '手机号已存在');
    }

    const user = await memberService.createMember(body);

    this.setRes({
      ...this.ctx.helper._.pick(user, [ 'name', 'phone' ]),
    });
  }


  /**
   * @summary 查询会员列表
   * @description 查询会员列表
   * @Router GET /sweet/member/list
   * @request params number pageNum   页码
   * @request params number pageSize  pageSize
   * @Response 200 getUserDetailResponse ok
   */
  async list() {
    const pageInfo = {
      pageSize: 10, pageNum: 1,
    };
    const res = await this.memberService.getList({ ...pageInfo, ...this.ctx.query, status: 1 });
    this.setRes(res);

  }


}

module.exports = UserController;
