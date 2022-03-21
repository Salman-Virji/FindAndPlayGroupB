require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const GenerateToken = () => crypto.randomBytes(32).toString('hex');

/**
 * @param payload Either UserID or SessionID
 * @param max_age Life of JWT Token in in seconds - Eg: 60, or "2h"
 */
const GenerateJWT = (id, key, max_age) => {
    return jwt.sign({ payload: id }, key, {
        expiresIn: max_age,
    });
};

const ValidateJWT = (JWToken, key) => {
    return jwt.verify(JWToken, key)
};

module.exports = {
    ValidateJWT,
    GenerateJWT,
    GenerateToken,
};
