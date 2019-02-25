'use strict';

const Controller = require('egg').Controller;

class UrlController extends Controller {
  async getURL(ctx) {
    // const url = ctx.request.body.url;
    // const method = ctx.request.body.method;
    // detai 就是所有请求的内容
    const detail = ctx.request.body.detail;
    // const encryptDetail = await ctx.service.cipher.
    // const result = await ctx.service.url.requestRemoteServer(detail);
    console.log(7777, result);
    ctx.body = result;
  }

  async test() {
    const { ctx } = this;
    const result = await ctx.curl('http://www.baidu.com', {
      dataType: 'text',
    });

    ctx.body = result.data;
  }
}

module.exports = UrlController;
