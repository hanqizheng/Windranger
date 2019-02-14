'use strict';

const Service = require('egg').Service;

class HandlerService extends Service {
  async proxy(url, method) {
    console.log(`comming proxy ${url} _ ${method}`);
  }
}

module.exports = HandlerService;
