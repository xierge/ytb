/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

const userLevelEnum = {
  Boss: 'Boss',
  Staff: 'Staff',
};

/**
 * @Controller User 用户相关接口
 */
class UserController extends BaseController {
  get userServive() {
    return this.service.user;
  }

  /**
   * @summary 用户登录
   * @description 用户登录
   * @Router POST /v1/login
   * @Request body loginUser
   * @Response 200 loginUserResponse ok
   */
  async login() {
    const { ctx, app } = this;
    const body = ctx.request.body;
    const userServive = this.service.user;
    ctx.validate({
      phone: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    });

    const user = await userServive.findByPhone(body.phone);
    if (!user) ctx.throw(422, '用户不存在，请先注册');

    if (user.password !== this.ctx.helper.md5(body.password)) ctx.throw(422, '密码错误');
    const token = await userServive.createToken({ userId: user._id });
    await app.redis.set(token, user._id);
    await app.redis.expire(token, 60 * 60 * 24);
    this.setRes({
      token,
      ...user,
    }, '请求成功', 100000);
  }

  /**
   * @summary 退出登录
   * @description 退出登录
   * @Router POST /v1/logout
   * @Request header string *authorization token
   * @Response 200 baseResponse ok
   */
  async logout() {
    const token = this.ctx.get('authorization');
    await this.app.redis.del(token);
    this.setRes();
  }

  /**
   * @summary 创建用户
   * @description 创建用户
   * @Router POST /v1/user
   * @Request body createUser 创建用户的参数
   * @Response 200 createUserResponse ok
   */
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    const userServive = this.service.user;

    ctx.validate({
      phone: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      username: {
        type: 'string',
      },
    });
    if (await userServive.findByPhone(body.phone)) {
      ctx.throw(422, '用户已存在');
    }

    const bossList = [ '18768861867', '15290882887' ];
    const isBoss = bossList.includes(body.phone);

    const user = await userServive.createUser({ ...body, role: isBoss ? userLevelEnum.Boss : userLevelEnum.Staff });
    this.setRes({
      ...this.ctx.helper._.pick(user, [ 'username', 'phone' ]),
    });
  }


  /**
   * @summary 查询当前用户的信息
   * @description 查询当前用户的信息
   * @Request header string *authorization token
   * @Router GET /v1/user
   * @Response 200 getUserDetailResponse ok
   */
  async getUserInfo() {
    const user = await this.userServive.findById(this.ctx.userInfo.userId);
    this.setRes({
      ...this.ctx.helper._.pick(user, [ 'username', 'role', 'phone', '_id', 'createdAt', 'updatedAt' ]),
    });
  }


  /**
   * @summary 修改用户
   * @description 修改用户
   * @Router PUT /v1/user/{id}
   * @Request path string *id 修改用户的id
   * @Request header string *authorization token
   * @Request body createUser 修改的信息
   * @Response 200 getUserDetailResponse ok
   */
  async update() {
    const { ctx } = this;
    ctx.validate({
      username: {
        type: 'string',
        required: false,
      },
      password: {
        type: 'string',
        required: false,
      },
      email: {
        type: 'string',
        required: false,
      },
    });
    const id = ctx.params.id;

    try {
      const { username, password, email } = ctx.request.body;

      if (username && username !== ctx.userInfo.username) {
        const user = await this.userServive.findByPhone(username);
        if (user) ctx.throw(422, 'username重复');
      }

      if (email && email !== ctx.email && !await this.userServive.findByEmail(email)) {
        const user = await this.userServive.findByEmail(email);
        if (user) ctx.throw(422, 'email重复');
      }

      if (password) {
        ctx.request.body.password = this.ctx.helper.md5(password);
      }
      await this.userServive.update(id, ctx.request.body);
    } catch (error) {
      this.ctx.throw(500, error);
    }
    this.setRes();

  }

  /**
   * @summary 删除用户
   * @description 删除用户
   * @Router DELETE /v1/user/{id}
   * @Request path string *id 修改用户的id
   * @Response 200 baseResponse ok
   */
  async delete() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await this.userServive.delete(id);
    if (!res) ctx.throw(422, '无此用户');
    this.setRes();
  }

  /**
   * @summary 验证码
   * @description 验证码
   * @Router GET /v1/captcha
   * @Response 200 captcha ok
   */
  async captcha() {
    const { token, text, data } = await this.userServive.captcha();
    const { app } = this;
    await app.redis.set(token, text);
    await app.redis.expire(token, 60);
    this.setRes({ token, data });
  }

}

module.exports = UserController;
