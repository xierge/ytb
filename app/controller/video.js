/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

/**
 * @Controller Video 视频相关
 */
class VideoController extends BaseController {
  get videoServive() {
    return this.service.video;
  }

  /**
   * @summary 新增视频
   * @description 新增视频
   * @Router POST /v1/video
   * @request body video  视频参数
   */
  async createVideo() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
    }, body);

    body.user = ctx.userInfo.userId;
    const res = await this.videoServive.create(body);
    this.setRes(res);
  }

  /**
   * @summary 查看视频详情
   * @description 查看视频详情
   * @Router GET /v1/video/findOne/{id}
   * @request path string id   视频id
   */
  async getVideo() {
    const { Video, Like, Subscribe } = this.app.model;
    const videoId = this.ctx.params.id;
    let res = await Video.findById(videoId).populate('user', 'subscribeCount _id username avatar');
    res = res.toJSON();
    // 判断是否登录
    if (this.ctx.userInfo) {
      const { userId } = this.ctx.userInfo;
      if (await Subscribe.findOne({ user: userId, channel: res.user._id })) {
        res.user.isSubscribe = true;
      }

      if (await Like.findOne({ user: userId, like: 1, video: videoId })) {
        res.isLiked = true;
      }

      if (await Like.findOne({ user: userId, like: -1, video: videoId })) {
        res.isDisLiked = true;
      }
    }
    this.setRes(res);
  }

  /**
   * @summary 获取视频列表
   * @description 获取视频列表
   * @Router GET /v1/video
   * @request params number pageNum   页码
   * @request params number pageSize   pageSize
   */
  async getVideos() {
    const { pageSize = 10, pageNum = 1 } = this.ctx.query;
    const { Video } = this.app.model;
    const getList = Video.find().populate('user').sort({
      createdAt: -1,
    })
      .skip(pageNum - 1)
      .limit(pageSize * 1);
    const getCount = Video.countDocuments();

    const [ list, count ] = await Promise.all([ getList, getCount ]);
    this.setRes({ list, count });
  }

  /**
   * @summary 获取发布人视频列表
   * @description 获取发布人视频列表
   * @Router GET /v1/getUserVideos/{userId}
   * @request path string userId   用户id
   * @request params number pageNum   页码
   * @request params number pageSize   pageSize
   */
  async getUserVideos() {
    const { pageSize = 10, pageNum = 1 } = this.ctx.query;
    const { Video } = this.app.model;
    const userId = this.ctx.params.userId;
    const getList = Video.find({
      user: userId,
    }).populate('user').sort({
      createdAt: -1,
    })
      .skip(pageNum - 1)
      .limit(pageSize * 1);
    const getCount = Video.countDocuments({
      user: userId,
    });

    const [ list, count ] = await Promise.all([ getList, getCount ]);
    this.setRes({ list, count });
  }

  /**
   * @summary 获取当前用户订阅视频列表
   * @description 获取当前用户订阅视频列表
   * @Router GET /v1/getSubsribeVideos
   * @Request header string *authorization token
   * @request params number pageNum   页码
   * @request params number pageSize   pageSize
   */
  async getSubsribeVideos() {
    const { pageSize = 10, pageNum = 1 } = this.ctx.query;
    const { Video, Subscribe } = this.app.model;
    const { userId } = this.ctx.userInfo;
    const channels = await Subscribe.find({
      user: userId,
    }).populate('channel');

    const getList = Video.find({
      user: {
        $in: channels.map(item => item.channel._id),
      },
    }).populate('user').sort({
      createdAt: -1,
    })
      .skip(pageNum - 1)
      .limit(pageSize * 1);
    const getCount = Video.countDocuments({
      user: {
        $in: channels.map(item => item.channel._id),
      },
    });

    const [ list, count ] = await Promise.all([ getList, getCount ]);
    this.setRes({ list, count });
  }

  /**
   * @summary 修改视频
   * @description 修改视频
   * @Router PUT /v1/video/{id}
   * @Request path string id 视频id
   * @Request header string *authorization token
   */
  async updateVideo() {
    const { Video } = this.app.model;
    const { body } = this.ctx.request;
    if (body._id) delete body._id;
    if (body.user) delete body.user;
    const { id } = this.ctx.params;
    let video = await Video.findById(id);
    if (!video) this.ctx.throw(422, '不存在此视频');
    if (video.user.toString() !== this.ctx.userInfo.userId) this.ctx.throw(403, '只有发布人可以修改此视频');
    video = Object.assign(video, body);
    await video.save();
    this.setRes();
  }

  /**
   * @summary 删除视频
   * @description 删除视频
   * @Router DELETE /v1/video/{id}
   * @Request header string *authorization token
   * @Request path string id 视频id
   */
  async deleteVideo() {
    const { Video } = this.app.model;
    const { id } = this.ctx.params;
    const video = await Video.findById(id);
    if (!video) this.ctx.throw(422, '不存在此视频');
    if (video.user.toString() !== this.ctx.userInfo.userId) this.ctx.throw(403, '只有发布人可以删除此视频');
    await video.remove();
    this.setRes();
  }

}

module.exports = VideoController;
