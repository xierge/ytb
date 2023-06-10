/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

/**
 * @Controller User 用户相关接口
 */
class UserController extends BaseController {
  get userServive() {
    return this.service.user;
  }

  get subscribeService() {
    return this.service.subscribe;
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
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    });

    const user = await userServive.findByUsername(body.username);
    if (!user) return this.setErrorRes('用户不存在，请先注册', 1);

    if (user.password !== this.ctx.helper.md5(body.password)) return this.setErrorRes('密码错误');
    const token = await userServive.createToken({ userId: user._id });
    await app.redis.set(token, user._id);
    await app.redis.expire(token, 60 * 60 * 24);
    this.setRes({
      email: user.email,
      token,
      username: user.username,
      channelDescription: user.channelDescription,
      avatar: user.avatar,
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
      username: {
        type: 'string',
      },
      email: {
        type: 'email',
      },
      password: {
        type: 'string',
      },
    });
    if (await userServive.findByUsername(body.username)) { return this.setErrorRes('用户已存在'); }


    if (await userServive.findByEmail(body.email)) {
      return this.setErrorRes('邮箱已存在');
    }

    const user = await userServive.createUser(body);
    this.setRes({
      ...this.ctx.helper._.pick(user, [ 'email', 'username', 'channelDescription', 'avatar', 'subscribeCount' ]),
    });
  }


  /**
   * @summary 查询当前用户的信息
   * @description 查询当前用户的信息
   * @Request header string *authorization token
   * @Router GET /v1/user
   * @Response 200 getUserDetailResponse ok
   */
  async getCurrentUser() {
    const user = await this.userServive.findById(this.ctx.userInfo.userId);
    this.setRes({
      ...this.ctx.helper._.pick(user, [ 'avatar', 'cover', 'channelDescription', 'subscribeCount', '_id', 'username', 'email', 'createdAt', 'updatedAt' ]),
    });
  }

  /**
   * @summary 查询用户信息
   * @description 查询用户信息
   * @Router GET /v1/user/{id}
   * @Request header string authorization token
   * @Request path string id 用户的id
   * @Response 200 getUserDetailResponse ok
   */
  async getUser() {
    let isSubscribed = false;
    const userId = this.ctx.userInfo && this.ctx.userInfo.userId;
    const channelId = this.ctx.params.id;
    if (userId) {
      const res = await this.subscribeService.find({ user: userId, channel: channelId });
      if (res) isSubscribed = true;
    }
    const user = await this.userServive.findById(channelId);
    user.isSubscribed = isSubscribed;
    this.setRes({
      ...this.ctx.helper._.pick(user, [ 'avatar', 'cover', 'channelDescription', 'subscribeCount', '_id', 'username', 'email', 'createdAt', 'updatedAt' ]),
      isSubscribed,
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
        const user = await this.userServive.findByUsername(username);
        if (user) return this.setErrorRes('username重复');
      }

      if (email && email !== ctx.email && !await this.userServive.findByEmail(email)) {
        const user = await this.userServive.findByEmail(email);
        if (user) return this.setErrorRes('email重复');
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
    if (!res) return this.setErrorRes('无此用户');
    this.setRes();
  }

}

module.exports = UserController;
