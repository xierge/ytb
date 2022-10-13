/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

/**
 * @Controller Like 视频点赞相关
 */
class LikeController extends BaseController {


  /**
   * @summary 视频喜欢
   * @description 视频喜欢
   * @Router POST /v1/like/like
   * @Request header string authorization token
   * @Request body like 参数
   */
  async like() {
    const body = this.ctx.request.body;
    const { userId } = this.ctx.userInfo;
    const { Like, Video } = this.app.model;
    this.ctx.validate({
      video: {
        type: 'string',
      },
    }, body);

    body.like = 1;

    const like = await Like.findOne({
      user: userId,
      video: body.video,
    });

    let video = await Video.findById(body.video).populate('user');
    let liked = true;
    if (!like) {
      await new Like({ ...body, user: userId }).save();
      video.likedCount++;
    } else if (like.like !== 1) {
      like.like = body.like;
      await like.save();
      video.likedCount++;
      video.dislikedCount--;
    } else {
      await like.remove();
      video.likedCount--;
      liked = false;
    }
    await video.save();
    video = video.toJSON();

    this.setRes({ ...video, liked });
  }

  /**
   * @summary 视频不喜欢
   * @description 视频不喜欢
   * @Router POST /v1/like/dislike
   * @Request header string authorization token
   * @Request body like 参数
   */
  async dislike() {
    const body = this.ctx.request.body;
    const { userId } = this.ctx.userInfo;
    const { Like, Video } = this.app.model;
    this.ctx.validate({
      video: {
        type: 'string',
      },
    }, body);
    body.like = -1;


    const like = await Like.findOne({
      user: userId,
      video: body.video,
    });

    let video = await Video.findById(body.video).populate('user');
    let disliked = true;
    if (!like) {
      await new Like({ ...body, user: userId }).save();
      video.dislikedCount++;
    } else if (like.like !== body.like) {
      like.like = body.like;
      await like.save();
      video.likedCount--;
      video.dislikedCount++;
    } else {
      disliked = false;
      await like.remove();
      video.dislikedCount--;
    }

    await video.save();
    video = video.toJSON();
    this.setRes({ ...video, disliked });
  }

  /**
   * @summary 获取喜欢列表
   * @description 获取喜欢列表
   * @Router GET /v1/like/like
   * @Request header string authorization token
   */
  async getList() {
    const { userId } = this.ctx.userInfo;
    const { Like, Video } = this.app.model;

    const { pageSize = 10, pageNum = 1 } = this.ctx.query;
    const getLikes = await Like.find({
      user: userId,
      like: 1,
    }).populate('user')
      .sort({
        createdAt: -1,
      })
      .skip(pageNum - 1)
      .limit(pageSize * 1);

    const getList = Video.find({
      _id: {
        $in: getLikes.map(item => item.video),
      },
    }).populate('user');
    const getCount = Like.countDocuments({
      user: userId,
      like: 1,
    });

    const [ list, count ] = await Promise.all([ getList, getCount ]);
    this.setRes({ list, count });

  }
}

module.exports = LikeController;
