'use strict';

const Controller = require('egg').Controller;

class UrlController extends Controller {
  async getURL(ctx) {
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

    // 对应数据存入数据库
    await ctx.service.storage.addRequestData(originRequestData);
    // 是将元数据转换成buffer
    const dataBuffer = Buffer.from(JSON.stringify(originRequestData));

    // 生成一个加密数据的256长度数组
    const encodePassword = await ctx.service.cipher.generateRandomPassword();
    // console.log(11111, encodePassword);

    // 加密数据
    const encryptData = await ctx.service.securitySocket.encodeBuffer(dataBuffer, encodePassword);
    // console.log(222222, encryptData);

    // 加密数据以后就要把加密过的数据和加密数组一并发过去。
    const result = await ctx.service.url.requestRemoteServer(encryptData, encodePassword);
    const resultJSON = JSON.parse(result.data);
    const encryptResult64 = resultJSON.result;

    const encryptResult = Buffer.from(encryptResult64, 'base64');

    // 生成对应的解密 密码
    const decodePassword = await ctx.service.cipher.createCipher(encodePassword);

    const trueResult = await ctx.service.securitySocket.decodeBuffer(encryptResult, decodePassword);
    // console.log(7461, trueResult.toString());
    // const trueData64 = result.data
    ctx.body = trueResult;

    // 生成一个对应加密数组的解密数组
    // const decodePassword = await ctx.service.cipher.createCipher(encodePassword);
    // console.log(22222, decodePassword);

    // 解密数据
    // const trueData = await ctx.service.securitySocket.decodeBuffer(encryptData, decodePassword);
    // console.log(99999, trueData);
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
