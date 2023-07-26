/* eslint-disable jsdoc/check-tag-names */
'use strict';

const BaseController = require('./base');

/**
 * @Controller DSC 大商创接口透传
 */
class DSCController extends BaseController {

  // async post() {
  //   const { url } = this.ctx.query;
  //   const res = await this.ctx.curl(url, {
  //     dataType: 'json',
  //   });
  //   this.setRes(res.data.data);
  // }


  /**
   * @summary get透传
   * @description get透传接口
   * @Request query string *url url
   * @Request query params params 传的数据
   * @Router GET /v1/dsc
   */
  async get() {
    const { url } = this.ctx.query;
    const res = await this.ctx.curl(url, {
      dataType: 'json',
    });
    this.setRes(res.data.data);
  }
}

module.exports = DSCController;
