'use strict';

const Service = require('egg').Service;
const https = require('https');
const querystring = require('querystring');

class UrlService extends Service {
  async requestRemoteServer(url, method) {
    const reqBody = querystring.stringify({
      'url': url,
      'method': method
    });

    const option = {
      hostname: '149.28.74.184',
      port: '7001',
      path: '/request',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(reqBody)
      }
    }

    const req = https.request(option, res => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    })

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    
    // write data to request body
    req.write(reqBody);
    req.end();
  }
}

module.exports = UrlService;
