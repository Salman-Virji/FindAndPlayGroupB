const crypto = require('crypto');

const GenerateToken = () => crypto.randomBytes(32).toString('hex');

module.exports = GenerateToken;