/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

/**
 * @Controller Comment 评论相关
 */
class CommentController extends BaseController {
  get Comment() {
    return this.app.model.Comment;
  }
  get Video() {
    return this.app.model.Video;
  }

  /**
   * @summary 新增评论
   * @description 新增评论
   * @Router POST /v1/comment
   * @request body comment  评论参数
   * @Request header string *authorization token
   */

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      content: {
        type: 'string',
      },
      video: {
        type: 'string',
      },
    }, body);

    body.user = ctx.userInfo.userId;

    const video = await this.Video.findById(body.video);
    if (!video) this.ctx.throw(422, '评论的视频不存在');

    // 创建评论
    const comment = await new this.Comment(body).save();

    // 更新视频的评论数
    video.commentsCount = await this.Comment.countDocuments({
      video: body.video,
    });
    await video.save();

    // 组装comment表相关数据
    await comment.populate('user').populate('video').execPopulate();

    this.setRes(
      comment
    );
  }

  /**
   * @summary 获取评论列表
   * @description 获取评论列表
   * @Router GET /v1/comment/{id}
   * @request path string id  评论id
   */
  async getList() {
    const { videoId } = this.ctx.params;

    const _video = await this.Video.findById(videoId);
    if (!_video) this.ctx.throw(422, '评论的视频不存在');

    const { pageSize = 10, pageNum = 1 } = this.ctx.query;
    const { Comment } = this.app.model;
    const getList = Comment.find({
      video: videoId,
    }).populate('user').populate('video')
      .sort({
        createdAt: -1,
      })
      .skip(pageNum - 1)
      .limit(pageSize * 1);
    const getCount = Comment.countDocuments({
      video: videoId,
    });

    const [ list, count ] = await Promise.all([ getList, getCount ]);
    this.setRes({ list, count });
  }

  /**
   * @summary 删除评论
   * @description 删除评论
   * @Request header string *authorization token
   * @Router DELETE /v1/comment/{videoId}
   * @request path string videoId  视频id
   */
  async delete() {
    const { id } = this.ctx.params;

    const comment = await this.Comment.findById(id).populate('video');
    if (!comment) this.ctx.throw(422, '评论不存在');
    const currentUserId = this.ctx.userInfo.userId;
    if (!(comment.user.equals(currentUserId) || comment.video.user.equals(currentUserId))) this.ctx.throw(403, '只有作者和本人可以删除此评论');

    const video = await this.Video.findById(comment.video._id);
    if (!video) this.ctx.throw(422, '视频不存在');
    await comment.remove();
    video.commentsCount--;
    await video.save();
    this.setRes();
  }

}

module.exports = CommentController;
