'use strict';

const Controller = require('egg').Controller;

class HandlerController extends Controller {
  async handleLocalRequest() {
    const url = ctx.request.body.url;
    const method = ctx.request.body.method;
    const data = await ctx.service.handler.proxy(url, method);
    ctx.body = data;
  }
}

module.exports = HandlerController;
