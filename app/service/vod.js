const Service = require('egg').Controller;

class vodService extends Service {
  get Video() {
    return this.app.model.Video;
  }

  async createUser(data) {
    const video = new this.Video(data);
    const res = await video.save();
    return res;
  }
}


module.exports = vodService;
