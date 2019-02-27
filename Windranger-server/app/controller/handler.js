'use strict';

const Controller = require('egg').Controller;

class HandlerController extends Controller {
  async handleLocalRequest(ctx) {
    // 带有64的变量是通过base64加密过的，需要先变回buffer
    const data64 = ctx.request.body.encryptData;
    const encodePassword64 = ctx.request.body.encode;
    console.log('------------server handelr---------------');

    const dataBuffer = Buffer.from(data64, 'base64');
    const encodePassword = Buffer.from(encodePassword64, 'base64');
    console.log(dataBuffer);
    console.log(encodePassword);

    const decodePassword = await ctx.service.cipher.createCipher(encodePassword);
    const trueData = await ctx.service.securitySocket.decodeBuffer(dataBuffer, decodePassword);

    console.log(trueData.toString());
    ctx.body = {
      data: trueData,
      decode: decodePassword,
    };
  }

  async test(ctx) {
    ctx.body = 'server success!!';
  }
}

module.exports = HandlerController;
