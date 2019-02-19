'use strict';

const Controller = require('egg').Controller;

class UrlController extends Controller {
  async getURL(ctx) {
    const url = ctx.request.body.url;
    const method = ctx.request.body.method;
    const result = await ctx.service.url.requestRemoteServer(url, method);
    // reqBody是一个Json，data是一个Json格式的buffer
    const reqBody = JSON.parse(JSON.stringify(result.data.data), (key, value) => {
      return value && value.type === 'Buffer' ?
        Buffer.from(value.data) :
        value;
    });
    console.log(reqBody.toString('ascii'));
    ctx.body = reqBody;
  }

  async test() {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = 'success';
  }
}

module.exports = UrlController;
