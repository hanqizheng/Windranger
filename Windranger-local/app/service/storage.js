'use strict';

const Service = require('egg').Service;

class StorageService extends Service {
  async addRequestData(originData) {
    const { ctx } = this;
    const _method = originData.method;
    const _url = originData.url;
    const _requestId = originData.requestId;
    const result = await ctx.model.Request.create({
      method: _method,
      url: _url,
      requestId: _requestId,
    });
    return result;
  }
}

module.exports = StorageService;
