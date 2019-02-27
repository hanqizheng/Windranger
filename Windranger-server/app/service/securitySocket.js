'use strict';

const Service = require('egg').Service;

class SecurityService extends Service {
  async encodeBuffer(chunk, encodePassword) {
    const { ctx } = this;
    if (!chunk) {
      return;
    }
    const encode = await ctx.service.cipher.encode(chunk, encodePassword);
    return encode;
  }

  async decodeBuffer(chunk, decodePassword) {
    const { ctx } = this;
    if (!chunk) {
      return;
    }
    const decode = await ctx.service.cipher.decode(chunk, decodePassword);
    return decode;
  }
}

module.exports = SecurityService;
