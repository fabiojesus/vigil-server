const Account = require('../../../DataAccess/Accounts/Account');
const Token = require('../../../DataAccess/Accounts/Token');
const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');
const decode = require('jwt-decode');

function login(email, password){
    return new Promise(function(resolve, reject){
        utils.validateAccount(email, password).then(function(res){resolve(res)}).catch(function(res){resolve(res)});
    });
}

function logout(token){
    return new Promise(function(resolve, reject){
        Token.erase(token).then(resolve({code:msg.LOGOUT_SUCCESSFUL})).catch(function(err){resolve(err)});
    });
}

function changePassword(token, email, password){
    return new Promise(function(resolve, reject){
        if(decode(token).email != email){resolve({code:msg.WRONG_ACCOUNT}); result;}
        Account.search(email).then(function(foundEmail){
            foundEmail = foundEmail.content;
            if(!foundEmail){resolve({code:msg.ACCOUNT_NOT_EXISTS}); return;}
            Account.update(foundEmail._id, null, password, null).then(function(){
                utils.sendPasswordChangeEmail(email, password);
                resolve({code: msg.PASSWORD_SENT})
            });
        });
    });
}

function recoverPassword(email){
    return new Promise(function(resolve, reject){
        Account.search(email).then(function(foundEmail){
            foundEmail = foundEmail.content;
            if(!foundEmail){resolve({code:msg.ACCOUNT_NOT_EXISTS}); return;}
            var newPassword = utils.generateRandomPassword();
            Account.update(foundEmail._id, null, newPassword, null).then(function(){
                utils.sendRecoveryEmail(email, newPassword);
                resolve({code: msg.PASSWORD_SENT})
            });
        });
    });
}

function clearTokens(token){
    utils.isAdmin(token).then(function(isAdmin){
        if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
        Token.eraseAll().then(function(res){
            Token.create(token).then(function(res){
                resolve({code:msg.TOKEN_CLEAR});
            }).catch(function(res){resolve(res)})
        }).catch(function(res){resolve(res)});
    });
}

module.exports = {
    login,
    logout,
    changePassword,
    recoverPassword,
    clearTokens
}