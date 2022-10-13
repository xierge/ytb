'use strict';

const BaseController = require('./base');

/**
* @Controller aliyun-vod 阿里云视频点播服务
*/
class VodController extends BaseController {

  /**
   * @summary 获取视频上传地址和凭证
   * @description 获取视频上传地址和凭证
   * @Router GET /v1/vod/createUploadVideo
   * @Request header string *authorization token
   * @Request query string *Title 标题
   * @Request query string *FileName 文件名称
   * @Response 200 baseResponse ok
   */
  async createUploadVideo() {
    const query = this.ctx.query;

    this.ctx.validate({
      Title: {
        type: 'string',
      },
      FileName: {
        type: 'string',
      },
    }, query);

    try {
      // const requestOption = {
      //   method: 'POST',
      //   formatParams: false,
      // };
      const res = await this.app.vodClient.request('CreateUploadVideo', query, {});
      this.setRes(res);
    } catch (error) {
      this.ctx.throw(500, error);
    }
  }

  /**
   * @summary 刷新视频上传地址和凭证
   * @description 刷新视频上传地址和凭证
   * @Router GET /v1/vod/refreshUploadVideo
   * @Request header string *authorization token
   * @Request query string *VideoId 音/视频ID
   * @Response 200 baseResponse ok
   */
  async refreshUploadVideo() {
    const query = this.ctx.query;

    this.ctx.validate({
      VideoId: {
        type: 'string',
      },
    }, query);

    try {
      const res = await this.app.vodClient.request('RefreshUploadVideo', query, {});
      this.setRes(res);
    } catch (error) {
      this.ctx.throw(500, error);
    }
  }
  /**
   * @summary 获取音视频播放凭证
   * @description 获取音视频播放凭证
   * @Router GET /v1/vod/getVideoPlayAuth
   * @Request query string *VideoId 音/视频ID
   * @Response 200 baseResponse ok
   */
  async getVideoPlayAuth() {
    const query = this.ctx.query;

    this.ctx.validate({
      VideoId: {
        type: 'string',
      },
    }, query);

    try {
      const res = await this.app.vodClient.request('GetVideoPlayAuth', query, {});
      this.setRes(res);
    } catch (error) {
      this.ctx.throw(500, error);
    }
  }
}

module.exports = VodController;
