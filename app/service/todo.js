/*
 * @Date: 2023-04-09 15:33:21
 * @LastEditors: 李鹏玺 2899952565@qq.com
 * @LastEditTime: 2023-06-06 22:55:54
 * @FilePath: /lx_ytb/app/service/todo.js
 * @description: 
 */
const Service = require('egg').Controller;

class TodoService extends Service {
  get Todo() {
    return this.app.model.Todo;
  }

  async create(data) {
    const user = new this.Todo(data);
    const res = await user.save();
    return res;
  }

  async getList({ pageNum, pageSize, ...query }) {
    const getData = this.Todo.find(query)
      .sort({
        createdAt: -1,
      })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize * 1);

    const getCount = this.Todo.countDocuments(query);
    const [ list, count ] = await Promise.all([ getData, getCount ]);
    return { list, count };
  }

  update(id, data) {
    return this.Todo.findByIdAndUpdate(id, data);
  }

  delete(id) {
    return this.Todo.findByIdAndDelete(id);
  }

  findById(id) {
    return this.Todo.findById(id);
  }
}


module.exports = TodoService;
