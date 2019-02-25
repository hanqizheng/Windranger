'use strict';

const Service = require('egg').Service;

class SecurityService extends Service {
  async encodeBuffer(chunk) {
    const { ctx } = this;
    if (!chunk) {
      return;
    }
    const encode = await ctx.service.cipher.encode(chunk);
    return encode;
  }

  async decodeBuffer(chunk) {
    const { ctx } = this;
    if (!chunk) {
      return;
    }
    const decode = await ctx.service.cipher.decode(chunk);
    return decode;
  }

  // async socketWrite(socket, buffer) {

  // }

  // async socketRead(socket, buffer) {
    
  // }
}

module.exports = SecurityService;
