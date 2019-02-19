'use strict';

const Controller = require('egg').Controller;

class UrlController extends Controller {
  async getURL(ctx) {
    const url = ctx.request.body.url;
    const method = ctx.request.body.method;
    const result = await ctx.service.url.requestRemoteServer(url, method);
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
