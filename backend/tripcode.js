let crypt = null;
try {
  crypt = require('unix-crypt-td-js');
} catch (e) {
  crypt = null;
}

function getTripLength(source) {
  const key = String(source || '');
  return key.length >= 12 ? 12 : 10;
}

function sanitizeSalt(s) {
  return String(s || '')
    .replace(/[\x00-\x20:;<=>?@[\\\]^_`]/g, '.')
    .replace(/[^.\/0-9A-Za-z]/g, '.');
}

function createLegacyTrip(source) {
  const salt = sanitizeSalt((source + 'H.').slice(1, 3));
  if (crypt) {
    const result = typeof crypt === 'function' ? crypt(source, salt) : crypt.crypt(source, salt);
    return String(result).slice(-10);
  }

  const crypto = require('crypto');
  return crypto
    .createHash('sha1')
    .update(source)
    .digest('base64')
    .replace(/[+=/]/g, '')
    .slice(0, 10);
}

function createLongTrip(source) {
  const crypto = require('crypto');
  return crypto
    .createHash('sha256')
    .update(source)
    .digest('base64')
    .replace(/[+=/]/g, '')
    .slice(0, 12);
}

function createTrip(source) {
  source = String(source || '');

  if (getTripLength(source) === 12) {
    return createLongTrip(source);
  }

  return createLegacyTrip(source);
}

module.exports = { createTrip };
