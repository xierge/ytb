/*
 * @Date: 2023-08-17 17:23:56
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2023-08-19 13:17:33
 * @FilePath: /lx_ytb/app/controller/role.js
 * @description:
 */
/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

/**
 * @Controller Role 角色
 */
class RoleController extends BaseController {
  get roleService() {
    return this.ctx.service.role;
  }

  /**
   * @summary 新增角色
   * @description 新增角色
   * @Router POST /v1/role
   * @Request header string authorization token
   * @Request body CreateRole 参数
   */
  async create() {
    const body = this.ctx.request.body;
    const { username } = this.ctx.userInfo;
    this.ctx.validate({
      roleName: {
        require: true,
        type: 'string',
      },
    }, body);
    body.menu = body?.menu?.join(',') || '';
    const res = await this.roleService.create({ ...body, operator: username, status: 0 });
    this.setRes(res);
  }


  /**
   * @summary 查看数据
   * @description 查看数据
   * @Router GET /v1/role/list
   * @Request header string authorization token
   * @request params number pageNum   页码
   * @request params number pageSize  pageSize
   * @request params string roleName 角色名称
   * @request params string id 角色id
   */
  async list() {
    // const { userId } = this.ctx.userInfo;
    const pageInfo = {
      pageSize: 10, pageNum: 1,
    };
    const res = await this.roleService.getList({ ...pageInfo, ...this.ctx.query, state: 0 });
    this.setRes(res);
  }


  /**
   * @summary 删除角色
   * @description 删除角色
   * @Request path string id 角色id
   * @Router DELETE /v1/role/{id}
   * @Request header string authorization token
   */
  async delete() {
    const { id } = this.ctx.params;
    await this.roleService.update(id, { status: 1 });
    this.setRes();
  }


  /**
   * @summary 角色修改
   * @description 角色修改
   * @Request path string id 当前角色id
   * @Router PUT /v1/role/{id}
   * @Request header string authorization token
   * @Request body CreateRole 参数
   */
  async update() {
    const { id } = this.ctx.params;
    const body = this.ctx.request.body;
    this.ctx.validate({
      roleName: {
        require: true,
        type: 'string',
      },
    }, body);
    body.menu = body?.menu?.join(',') || '';
    await this.roleService.update(id, body);
    this.setRes();
  }

  /**
   * @summary 角色详情
   * @description 角色详情
   * @request path string id  评论id
   * @Router GET /v1/role/{id}
   * @Request header string authorization token
   */
  async detail() {
    const { id } = this.ctx.params;
    const res = await this.roleService.findById(id);
    this.setRes(res);
  }
}

module.exports = RoleController;
