'use strict';

const Controller = require('egg').Controller;
const request = require('request');

class HomeController extends Controller {
  async index(ctx) {
    ctx.body = await request('http://www.baidu.com');
  }

  async getURL(ctx) {
    console.log(ctx.request.body.url);
    ctx.body = 'success';
  }
}

module.exports = HomeController;
