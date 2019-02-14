'use strict';

const Service = require('egg').Service;
const https = require('https');
const querystring = require('querystring');

class UrlService extends Service {
  async requestRemoteServer(url, method) {
    console.log(url);
    const reqBody = querystring.stringify({
      url,
      method,
    });

    const option = {
      protocol: 'https:',
      hostname: 'localhost',
      port: '7002',
      path: '/request',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(reqBody),
      },
    };

    const req = https.request(option, res => {
      res.setEncoding('utf8');
      res.on('data', chunk => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('Noreq more data in response.');
      });
    });

    req.on('error', e => {
      console.error(`problem with request: ${e.message}`);
    });

    console.log(8888, 'yeah!');
    // write data to request body
    req.write(reqBody);
    req.end();
  }

  async test() {
    console.log('-----------');
    const option = {
      protocol: 'https:',
      hostname: '127.0.0.1',
      port: '1234',
      path: '/test',
      method: 'GET',
    };

    let sendMsg = '';
    const req = https.request(option, req => {
      req.on('data', chunk => {
        sendMsg += chunk;
      });
      req.on('end', () => {
        const list = JSON.parse(sendMsg);
        console.log(list);
      });
    });
    req.end();
  }
}

module.exports = UrlService;
