const Service = require('egg').Controller;

class videoService extends Service {


  get Video() {
    return this.app.model.Video;
  }

  async create(body) {
    const video = new this.Video(body);
    const res = await video.save();
    return res;
  }
}


module.exports = videoService;
