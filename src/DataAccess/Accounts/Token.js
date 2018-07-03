const Token = require('../../Data/Account').Token;
const msg = require('../../Config/messages');

/**
 * Creates a new account record returning a {code, content} result
 */
function create(tokenValue){
    return new Promise(function(resolve, reject){
        Token.find({token:tokenValue}).then(function(tokens){
            if(tokens.length>0) reject({code:msg.TOKEN_EXISTS});
            else{
                var token = new Token({token:tokenValue});
                token.save(function(){resolve({code:msg.TOKEN_REGISTER, content:token.token})});
            }
        })
    });
}

function get(tokenId){
    return new Promise(function(resolve, reject){
        Token.findById(id).then(function(token){
            if(!token) reject({code:msg.TOKEN_NOT_EXISTS});
            else resolve({code:msg.TOKEN_FETCH, content:account});
        });
    });
}

function erase(tokenValue){
    return new Promise(function(resolve, reject){
        Token.deleteOne({token:tokenValue}).then(resolve({code:msg.TOKEN_REMOVED})).catch(resolve({code:msg.TOKEN_REMOVE_ERROR}));
    });
}

function search(tokenValue){
    return new Promise(function(resolve, reject){
        Token.find({token:tokenValue}).then(function(tokens){
            if(tokens.length == 0) reject({code:msg.TOKEN_NOT_EXISTS});
            resolve({code: msg.TOKEN_FETCH, content:tokens[0]});
        });
    })
}

module.exports = {create, get, erase, search};
