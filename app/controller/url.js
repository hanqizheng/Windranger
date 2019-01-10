'use strict';

const Controller = require('egg').Controller;

class URLController extends Controller {
  async getURL(ctx) {
    console.log(ctx.request.body.url);
    ctx.body = 'get the url successfully!';
  }
}

module.exports = URLController;
