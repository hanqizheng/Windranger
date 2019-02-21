'use strict';

const Controller = require('egg').Controller;

class HandlerController extends Controller {
  async handleLocalRequest(ctx) {
    const url = ctx.request.body.url;
    const method = ctx.request.body.method;
    console.log('------------server handelr---------------');
    console.log(url);
    const data = await ctx.service.handler.proxy(url, method);
    ctx.body = data;
  }

  async test(ctx) {
    ctx.body = 'server success!!';
  }
}

module.exports = HandlerController;
