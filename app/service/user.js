/*
 * @Date: 2023-03-07 22:17:47
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-05-30 00:48:46
 * @FilePath: /lx_ytb/app/service/user.js
 * @description: user相关
 */
const Service = require('egg').Controller;
const jwt = require('jsonwebtoken');
const { v1 } = require('uuid');
const svgCaptcha = require('svg-captcha');
class UserService extends Service {
  get User() {
    return this.app.model.User;
  }

  findByPhone(phone) {
    return this.User.findOne({
      phone,
    }).select('+password');
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

  async captcha() {
    const captcha = svgCaptcha.create();
    const token = v1();
    return { ...captcha, token };
  }
}


module.exports = UserService;
