const jwt = require('jsonwebtoken');
const { secret, token } = require('./conf.js');
const { v4: v4 } = require('uuid');

const generateAccessToken = (keyId) => {
    const payload = {
        key,
        type: token.access.type
    };
    const options = {
      expiresIn:token.access.expiresIn
    };
    return jwt.sign(payload,secret, options)
}

const generateRefreshToken = () => {
    const payload = {
        id: v4(),
        type: token.refresh.type
    };
    const options = {
      expiresIn:token.refresh.expiresIn
    };
    return {
        id: payload.id,
        token:jwt.sign(payload,secret, options)
    }
}
const replaceRefreshToken = (tokenId, ) => {
    
}