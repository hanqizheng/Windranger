'use strict';

const Controller = require('egg').Controller;

class UrlController extends Controller {
  async getURL(ctx) {
    const url = ctx.request.body.url;
    const method = ctx.request.body.method;
    const data = await ctx.service.url.requestRemoteServer(url, method);
    ctx.body = data;
  }
}

module.exports = UrlController;
