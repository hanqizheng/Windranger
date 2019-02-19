'use strict';

const Service = require('egg').Service;
// const http = require('http');
// const querystring = require('querystring');

class UrlService extends Service {
  async requestRemoteServer(_url, _method) {
    const { ctx } = this;
    console.log('-------url.requsetRemoteServer-------');
    const requestData = {
      url: _url,
      method: _method,
    };

    const options = {
      method: 'POST',
      data: requestData,
      dataType: 'json',
      contentType: 'json',
    };

    const result = await ctx.curl('http://127.0.0.1:1234/request', options);
    return result;
  }
}

module.exports = UrlService;

// 原生的Node写http请求
// let data;
// const requestData = querystring.stringify({
//   url: _url,
//   method: _method,
// });

// const options = {
//   protocol: 'http:',
//   host: 'localhost',
//   port: 1234,
//   path: '/request',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Length': Buffer.byteLength(requestData),
//   },
// };

// const req = http.request(options, res => {
//   res.setEncoding('utf8');
//   res.on('data', chunk => {
//     console.log(`BODY: ${chunk}`);
//     chunk.pipe(data);
//   });
// });

// req.on('error', e => {
//   console.error(`problem with request: ${e.message}`);
// });

// // write data to request body
// req.write(requestData);
// req.end();
