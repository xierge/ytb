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
      .skip(pageNum - 1)
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
