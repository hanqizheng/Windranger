'use strict';

const Service = require('egg').Service;
const http = require('http');
const querystring = require('querystring');

class UrlService extends Service {
  async requestRemoteServer(_url, _method) {
    console.log('-------url.requsetRemoteServer-------');

    const requestData = querystring.stringify({
      url: _url,
      method: _method,
    });

    const options = {
      protocol: 'http:',
      host: '149.28.74.184',
      port: 1234,
      path: '/request',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(requestData),
      },
    };

    const req = http.request(options, res => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', chunk => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.\n---------------------------');
      });
    });

    req.on('error', e => {
      console.error(`problem with request: ${e.message}`);
    });

    // write data to request body
    req.write(requestData);
    req.end();
  }
}

module.exports = UrlService;
