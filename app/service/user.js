const Service = require('egg').Controller;
const jwt = require('jsonwebtoken');

class UserService extends Service {
  get User() {
    return this.app.model.User;
  }
  findByUsername(username) {
    return this.User.findOne({
      username,
    }).select('+password');
  }

  findByEmail(email) {
    return this.User.findOne({
      email,
    }).select('+password');
  }

  findById(id) {
    return this.User.findById(id).select('+password');
  }

  async createUser(data) {
    const user = new this.User(data);
    user.password = this.ctx.helper.md5(data.password);
    const res = await user.save();
    return res;
  }

  createToken(data) {
    return jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: this.app.config.jwt.expiresIn,
    });
  }

  verify(token) {
    return jwt.verify(token, this.app.config.jwt.secret);
  }

  valideUser(data) {
    return this.User.findOne(data);
  }


  update(id, data) {
    return this.User.findByIdAndUpdate(id, data);
  }

  delete(id) {
    return this.User.findByIdAndDelete(id);
  }
}


module.exports = UserService;
