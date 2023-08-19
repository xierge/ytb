/*
 * @Date: 2023-08-17 17:23:56
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2023-08-19 13:20:10
 * @FilePath: /lx_ytb/app/controller/menu.js
 * @description:
 */
/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

/**
 * @Controller Menu 菜单
 */
class MenuController extends BaseController {
  get menuService() {
    return this.ctx.service.menu;
  }

  /**
   * @summary 新增菜单
   * @description 新增菜单
   * @Router POST /v1/menu
   * @Request header string authorization token
   * @Request body CreateMenu 参数
   */
  async create() {
    const body = this.ctx.request.body;
    const { username } = this.ctx.userInfo;
    this.ctx.validate({
      menuName: {
        require: true,
        type: 'string',
      },
      order: {
        require: true,
        type: 'number',
      },
      menuType: {
        require: true,
        type: 'string',
      },
      pid: {
        require: true,
        type: 'string',
      },
    }, body);
    const res = await this.menuService.create({ ...body, operator: username, status: 0 });
    this.setRes(res);
  }


  /**
   * @summary 查看数据
   * @description 查看数据
   * @Router GET /v1/menu/list
   * @Request header string authorization token
   */
  async list() {
    // const { userId } = this.ctx.userInfo;
    const res = await this.menuService.getList();
    this.setRes(res);
  }


  /**
   * @summary 删除菜单
   * @description 删除菜单
   * @Request path string id 菜单id
   * @Router DELETE /v1/menu/{id}
   * @Request header string authorization token
   */
  async delete() {
    const { id } = this.ctx.params;
    await this.menuService.update(id, { status: 1 });
    this.setRes();
  }


  /**
   * @summary 菜单修改
   * @description 菜单修改
   * @Request path string id 当前菜单id
   * @Router PUT /v1/menu/{id}
   * @Request header string authorization token
   * @Request body CreateMenu 参数
   */
  async update() {
    const { id } = this.ctx.params;
    const body = this.ctx.request.body;
    this.ctx.validate({
      menuName: {
        require: true,
        type: 'string',
      },
      order: {
        require: true,
        type: 'number',
      },
      menuType: {
        require: true,
        type: 'string',
      }, pid: {
        require: true,
        type: 'string',
      },
    }, body);
    await this.menuService.update(id, body);
    this.setRes();
  }

  /**
   * @summary 菜单详情
   * @description 菜单详情
   * @request path string id  评论id
   * @Router GET /v1/menu/{id}
   * @Request header string authorization token
   */
  async detail() {
    const { id } = this.ctx.params;
    const res = await this.menuService.findById(id);
    this.setRes(res);
  }
}

module.exports = MenuController;
