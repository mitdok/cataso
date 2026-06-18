let crypt = null;
try {
  crypt = require('unix-crypt-td-js');
} catch (e) {
  crypt = null;
}

const DEFAULT_TRIP_LENGTH = 12;

function getTripLength() {
  const value = Number(process.env.TRIP_LENGTH || DEFAULT_TRIP_LENGTH);
  if (value === 10 || value === 12) {
    return value;
  }
  return DEFAULT_TRIP_LENGTH;
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
  const length = getTripLength();

  if (length === 10) {
    return createLegacyTrip(source);
  }

  return createLongTrip(source);
}

module.exports = { createTrip };
