'use strict';

const Service = require('egg').Service;

class HandlerService extends Service {
  async proxy(url, method) {
    console.log(`-----------------\ncomming proxy ${url} _ ${method}`);
    return `yes i got the url:${url} and method:${method}`;
  }
}

module.exports = HandlerService;
