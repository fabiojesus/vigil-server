const Token = require('../../Data/Account').Token;
const msg = require('../../Config/messages');

/**
 * Registers a token on the database
 * @param {string} tokenValue 
 */
function create(tokenValue){
    return new Promise(function(resolve, reject){
        Token.find({token:tokenValue}).then(function(tokens){
            if(tokens.length>0){ reject({code:msg.TOKEN_EXISTS}); return; }
            var token = new Token({token:tokenValue});
            token.save(function(){resolve({code:msg.TOKEN_REGISTER, content:token.token})});
        })
    });
}

/**
 * Gets a token by it's id
 * @param {string} tokenId 
 */
function get(id){
    return new Promise(function(resolve, reject){
        Token.findById(id).then(function(token){
            if(!token){reject({code:msg.TOKEN_NOT_EXISTS}); return;}
            resolve({code:msg.TOKEN_FETCH, content:account});
        });
    });
}

/**
 * Erases a token (connected to the logout in order to remove any unused tokens)
 * @param {string} tokenValue 
 */
function erase(tokenValue){
    return new Promise(function(resolve, reject){
        Token.deleteOne({token:tokenValue}).then(resolve({code:msg.TOKEN_REMOVED})).catch(resolve({code:msg.TOKEN_REMOVE_ERROR}));
    });
}

/**
 * Searches for a token
 * @param {string} tokenValue 
 */
function search(tokenValue){
    return new Promise(function(resolve, reject){
        Token.find({token:tokenValue}).then(function(tokens){
            if(tokens.length == 0){ reject({code:msg.TOKEN_NOT_EXISTS}); return;}
            resolve({code: msg.TOKEN_FETCH, content:tokens[0]});
        });
    })
}

/**
 * Lists all tokens
 */
function list(){
    return new Promise(function(resolve){
        Token.find({}).then(function(result){resolve({code: msg.TOKENS_FETCH, content:result});}).catch(function(res){reject(res)});
    });
}

function eraseAll(){
    return new Promise(function(resolve,reject){
        Token.deleteMany({}).then(function(res){resolve(res)}).catch(function(res){reject(res)});
    })
}

module.exports = {create, get, erase, search, list, eraseAll};
