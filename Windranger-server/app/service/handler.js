'use strict';

const Service = require('egg').Service;
// const http = require('http');
// const querystring = require('querystring');

class HandlerService extends Service {
  async proxy(requestData) {
    const { ctx } = this;
    const url = requestData.url;
    const method = requestData.method;

    if (method === 'GET') {
      const result = ctx.curl(url);
      return result;
    } else if (method === 'POST') {
      const options = {
        method: 'POST',
        dataType: 'text',
      };
      const result = ctx.curl(url, options);
      return result;
    }
  }
}

module.exports = HandlerService;


// const options = {
//   protocol: 'http:',
//   host: _url,
//   method: 'GET',
// };

// const req = http.request(options, res => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);

//   res.on('data', d => {
//     process.stdout.write(d);
//     data = d;
//   });
// });

// req.on('error', e => {
//   console.error(e);
// });

// req.end();
// return data;
