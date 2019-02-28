'use strict';

const Controller = require('egg').Controller;

class HandlerController extends Controller {
  async handleLocalRequest(ctx) {
    // 带有64的变量是通过base64加密过的，需要先变回buffer
    console.log('------------server handelr---------------');

    // 拿到windranger-local发来的加密数据
    const data64 = ctx.request.body.encryptData;
    const encodePassword64 = ctx.request.body.encode;

    // 解析加密数据
    const dataBuffer = Buffer.from(data64, 'base64');
    const encodePassword = Buffer.from(encodePassword64, 'base64');
    const decodePassword = await ctx.service.cipher.createCipher(encodePassword);
    let trueData = await ctx.service.securitySocket.decodeBuffer(dataBuffer, decodePassword);
    trueData = JSON.parse(trueData.toString());

    // 请求真正的服务器
    let result = await ctx.service.handler.proxy(trueData);
    result = result.data;

    // 加密数据发送回windranger-local
    const encryptResult = await ctx.service.securitySocket.encodeBuffer(result, encodePassword);

    ctx.body = {
      result: encryptResult.toString('base64'),
      encode: encodePassword.toString('base64'),
    };
  }

  async test(ctx) {
    ctx.body = 'server success!!';
  }
}

module.exports = HandlerController;
// result 格式 主要分三个部分 data / status / headers
// {
//   data: <Buffer 77 69 6e 64 6f 77 2e 73 79 6e 63 63 68 65 63 6b 3d 7b 72 65 74 63 6f 64 65 3a 22 31 31 30 32 22 2c 73 65 6c 65 63 74 6f 72 3a 22 30 22 7d >,
//   status: 200,
//   headers:
//   {
//     connection: 'keep-alive',
//       'access-control-allow-origin': '*',
//         'content-type': 'text/javascript',
//           'content-length': '46'
//   },
//   res:
//   {
//     status: 200,
//       statusCode: 200,
//         statusMessage: 'OK',
//           headers:
//     {
//       connection: 'keep-alive',
//         'access-control-allow-origin': '*',
//           'content-type': 'text/javascript',
//             'content-length': '46'
//     },
//     size: 46,
//       aborted: false,
//         rt: 137,
//           keepAliveSocket: false,
//             data: <Buffer 77 69 6e 64 6f 77 2e 73 79 6e 63 63 68 65 63 6b 3d 7b 72 65 74 63 6f 64 65 3a 22 31 31 30 32 22 2c 73 65 6c 65 63 74 6f 72 3a 22 30 22 7d >,
//               requestUrls:
//     ['https://webpush.wx2.qq.com/cgi-bin/mmwebwx-bin/synccheck?r=1551324000416&skey=%40crypt_3bb988cd_38eeeffb776af79e57e6ba19495d8035&sid=bjxWH7i7eoBVUh%2Bq&uin=2738124226&deviceid=e072600401360894&synckey=1_680111464%7C2_680111544%7C3_680111489%7C11_680111507%7C201_1551322620%7C203_1551319491%7C1000_1551310801%7C1001_1551310875&_=1551319392211'],
//       timing: null,
//         remoteAddress: '14.17.43.34',
//           remotePort: 443,
//             socketHandledRequests: 1,
//               socketHandledResponses: 1
//   }
// }
