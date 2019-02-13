'use strict';

const Service = require('egg').Service;
const https = require('https');

class UrlService extends Service {
  async requestRemoteServer(url, method) {
    // console.log(method);
    if (method === 'GET') {
      https.get(url, res => {
        let data = '';

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          return data;
        });
      }).on('error', error => {
        console.log(error);
      });
    } else if (method === 'POST') {
      console.log('post request');
    }
  }
}

module.exports = UrlService;
