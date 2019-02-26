'use strict';

const Service = require('egg').Service;
const PASSWORD_LENGTH = 256;

class CipherService extends Service {
  async generateRandomPassword() {
    let tempArray = new Array(PASSWORD_LENGTH);
    // 临时有序数组，准备打乱
    for (let i = 0; i < PASSWORD_LENGTH; i++) {
      tempArray[i] = i;
    }

    const shuffle = array => {
      let tmp;
      let current;
      let top = array.length - 1;
      if (top) {
        while (top) {
          // 0 - top的范围内随机产生一个数
          current = Math.floor(Math.random() * (top + 1));
          if (array[current] !== top) {
            // 如果当前位置的值不等于top的下标值，即交换
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
            top -= 1;
          }
        }
      }
      return array;
    };

    const generateRandom = array => {
      do {
        array = shuffle(array);
      } while (array[0] === 0);
      return array;
    };

    tempArray = generateRandom(tempArray);

    const passwordArray = Buffer.from(tempArray);
    return passwordArray;
  }

  async decode(buffer, decodePassword) {
    return buffer.map(value => decodePassword[value]);
  }

  async encode(buffer, encodePassword) {
    return buffer.map(value => encodePassword[value]);
  }

  // 创建加密数组的对应解密数组
  async createCipher(encodePassword) {
    if (typeof encodePassword === 'string') {
      encodePassword = Buffer.from(encodePassword, 'base64');
    }

    const decodePassword = Buffer.alloc(PASSWORD_LENGTH);
    for (let i = 0; i < decodePassword.length; i++) {
      const value = encodePassword[i];
      decodePassword.writeUInt8(i, value);
    }
    return decodePassword;
  }
}

module.exports = CipherService;
