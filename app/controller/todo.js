/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

/**
 * @Controller Todo 每日计划安排
 */
class TodoController extends BaseController {
  get todoService() {
    return this.ctx.service.todo;
  }

  /**
   * @summary 新增计划
   * @description 新增计划
   * @Router POST /v1/todo
   * @Request header string authorization token
   * @Request body CreateTodo 参数
   */
  async create() {
    const body = this.ctx.request.body;
    const { userId } = this.ctx.userInfo;
    this.ctx.validate({
      title: {
        require: true,
        type: 'string',
      },
      dtime: {
        require: true,
        type: 'number',
      },
    }, body);
    const res = await this.todoService.create({ ...body, userId, status: 0 });
    this.setRes(res);
  }

  /**
   * @summary 更改状态
   * @description 更改状态
   * @Request path string id 当前数据id
   * @Router PUT /v1/todo/changeStatus/{id}
   * @Request header string authorization token
   * @Request body CreateTodo 参数
   */
  async changeStatus() {
    const body = this.ctx.request.body;
    const { id } = this.ctx.params;
    const { userId } = this.ctx.userInfo;
    let todo = await this.todoService.findById(id);
    if (!todo) this.ctx.throw(422, '无此数据');

    if (todo.userId.toString() === userId) {
      return this.ctx.throw(422, '不能修改非本人的数据');
    }

    todo = Object.assign(todo, { status: body.status === 0 ? 1 : 0 });

    await todo.save();
    this.setRes();
  }

  /**
   * @summary 查看数据
   * @description 查看数据
   * @Router GET /v1/todo
   * @Request header string authorization token
   */
  async getList() {
    const { userId } = this.ctx.userInfo;
    const pageInfo = {
      pageSize: 10, pageNum: 1,
    };
    const res = await this.todoService.getList({ ...pageInfo, ...this.ctx.query, userId });
    this.setRes(res);
  }


  /**
   * @summary 删除计划
   * @description 删除计划
   * @Request path string id 当前数据id
   * @Router DELETE /v1/todo/{id}
   * @Request header string authorization token
   */
  async delete() {
    const { userId } = this.ctx.userInfo;
    const { id } = this.ctx.params;
    const todo = await this.todoService.findById(id);
    if (!todo) this.ctx.throw(422, '无此数据');
    if (todo.userId.toString() !== userId) {
      return this.ctx.throw(422, '不能删除非本人的数据');
    }
    await this.todoService.delete(id);
    this.setRes();
  }
}

module.exports = TodoController;
