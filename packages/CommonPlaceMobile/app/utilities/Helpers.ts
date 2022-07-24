const Buffer = require('buffer').Buffer;

export default class Helpers {
  constructor() {}

  isDefinedWithContent(item) {
    if (typeof item !== 'undefined' && item && item !== '' && item !== null) {
      if (item.constructor === Array && item.length > 0) {
        return true;
      } else if (item.constructor === Array && item.length === 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  createAuthHeader(str) {
    const authPayload = Buffer.from(`${str}`, 'utf8').toString('base64');
    return `Basic ${authPayload}`;
  }
}
