const Account = require('../../Data/Account').Account;
const msg = require('../../Config/messages');

/**
 * Registers a new account
 * @param {string} email 
 * @param {string} password 
 * @param {string} profileId 
 * @param {string} role 
 */
function create(email, password, profileId, role){
    return new Promise(function(resolve, reject){
        Account.find({email:email}).then(function(accounts){
            if(accounts.length>0){reject({code:msg.ACCOUNT_EXISTS});return;}
            var account = new Account({email:email, password:password, profileId:profileId, role:role, isDeleted:false});
            account.save(function(){resolve({code:msg.ACCOUNT_REGISTER, content:account._id})});
        })
    });
}

/**
 * Searches an account through it's email address
 * @param {string} email 
 */
function search(email){
    return new Promise(function(resolve, reject){
        Account.find({email:email}).then(function(accounts){
            if(accounts.length == 0){ reject({code:msg.ACCOUNT_NOT_EXISTS}); return;}
            resolve({code: msg.ACCOUNT_FETCH, content:accounts[0]});
        });
    })
}

/**
 * Returns a account object based on it's id
 * @param {string} id 
 */
function get(id){
    return new Promise(function(resolve, reject){
        Account.findById(id).then(function(account){
            if(!account){ reject({code:msg.ACCOUNT_NOT_EXISTS}); return;}
            resolve({code:msg.ACCOUNT_FETCH, content:account});
        });
    });
}

/**
 * Updates an account data
 * @param {*} id 
 * @param {*} email 
 * @param {*} password 
 * @param {*} role 
 */
function update(id, email, password, role){
    return new Promise(function(resolve, reject){
        Account.findById(id).then(function(account){
            if(!account){ reject({code:msg.ACCOUNT_NOT_EXISTS}); return;}
            if(email) account.email = email;
            if(password) account.password = password;
            if(role) account.role = role;
            Account.find({email:account.email, isDeleted:false, _id: {$ne: account._id}}).then(function(accounts){
                if(accounts.length>0){ reject({code:msg.ACCOUNT_EXISTS}); return;}
                account.save(function(){resolve({code:msg.ACCOUNT_UPDATED, content:account._id})});    
            });
        })
    });
}

function erase(id){
    return new Promise(function(resolve, reject){
        Account.findById(id).then(function(account){
            if(!account){ reject({code:msg.ACCOUNT_NOT_EXISTS}); return;}
            account.isDeleted = true;
            account.save(function(){resolve({code:msg.ACCOUNT_DELETED, content:account._id})});     
        }).catch(function(res){reject(res)})
    });
}

/**
 * Lists all the accounts
 */
function list(){
    return new Promise(function(resolve){
        Account.find({}).then(function(result){resolve({code: msg.ACCOUNTS_FETCH, content:result});});
    });
}

module.exports = {create, get, search, update, erase, list};
