const Service = require('egg').Controller;

class subscribeService extends Service {


  get Subscribe() {
    return this.app.model.Subscribe;
  }

  async create(body) {
    const subscribe = new this.Subscribe(body);
    const res = await subscribe.save();
    return res;
  }

  async delete(body) {
    try {
      const res = await this.Subscribe.deleteOne(body);
      return res;
    } catch (error) {
      this.ctx.throw(422, error);
    }
  }


  async find(body) {
    const res = await this.Subscribe.findOne(body);
    return res;
  }

  async findSenior(body, page) {
    const limit = (page.pageSize && page.pageSize * 1) || 10;
    const skip = limit * ((page.pageNum && --page.pageNum) || 0);
    const res = await
    this.Subscribe.find(body).limit(limit).skip(skip)
      .populate('channel');
    return res.map(item => {
      return { ...this.ctx.helper._.pick(item.channel, [ 'username', 'cover', '_id' ]) };
    });
  }
}


module.exports = subscribeService;
