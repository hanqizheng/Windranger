'use strict';

const Controller = require('egg').Controller;

class UrlController extends Controller {
  async getURL(ctx) {
    // const url = ctx.request.body.url;
    // const method = ctx.request.body.method;
    // const encryptDetail = await ctx.service.cipher.
    // const result = await ctx.service.url.requestRemoteServer(detail);

    // originRequestData 是crx 拦截的所有数据
    // {
    //   frameId: 0,
    //   initiator: "https://www.baidu.com",
    //   method: "GET",
    //   parentFrameId: -1,
    //   requestId: "24062",
    //   ...
    // }
    const originRequestData = ctx.request.body.requestData;

    // 是将元数据转换成buffer
    const dataBuffer = Buffer.from(JSON.stringify(originRequestData));

    // 生成一个加密数据的256长度数组
    const encodePassword = await ctx.service.cipher.generateRandomPassword();

    // 加密数据
    const encryptData = await ctx.service.securitySocket.encodeBuffer(dataBuffer, encodePassword);
    console.log(encryptData);

    // 生成一个对应加密数组的解密数组
    const decodePassword = await ctx.service.cipher.createCipher(encodePassword);

    // 解密数据
    const trueData = await ctx.service.securitySocket.decodeBuffer(encryptData, decodePassword);
    console.log(99999, trueData);
    // const encryptRequestData = await ctx.service.securitySocket.encodeBuffer(originRequestData);
    // ctx.body = result;
  }

  async test() {
    const { ctx } = this;
    const result = await ctx.curl('http://www.baidu.com', {
      dataType: 'text',
    });

    ctx.body = result.data;
  }
}

module.exports = UrlController;
