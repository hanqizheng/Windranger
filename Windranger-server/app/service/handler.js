'use strict';

const Service = require('egg').Service;
// const http = require('http');
// const querystring = require('querystring');

class HandlerService extends Service {
  async proxy(_url, _method) {
    const { ctx } = this;
    if (_method === 'GET') {

      const options = {
        method: 'GET',
      };
      const result = await ctx.curl(_url, options);
      return result;
    } else if (_method === 'POST') {
      console.log('------jump in POST--------');
    } else if (_method === 'PUT') {
      console.log('------jump in PUT--------');
    } else {
      console.log('------jump in DELETE--------');
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
