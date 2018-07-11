const Examinee = require('../../Data/Examinee').Examinee;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');


/**
 * Creates a new Examinee record returning a {code, content} result
 */
function create(identification, name){
    return new Promise(function(resolve, reject){
        Examinee.find({identification:identification, isDeleted:false}).then(function(examinees){
            if(examinees.length>0){ reject({code:msg.EXAMINEE_EXISTS}); console.log("u");return;}
            var examinee = new Examinee({identification:identification, name:name, isDeleted:false});
            examinee.save(function(){resolve({code:msg.EXAMINEE_REGISTER, content:examinee._id})});
        })
    });
}

/**
 * Searches for an Examinee record returning a {code, content} result that may contain the record
 */
function get(id){
    return new Promise(function(resolve, reject){
        Examinee.findById(id).then(function(examinee){
            if(!examinee){ reject({code:msg.EXAMINEE_NOT_EXISTS}); return;}
            resolve({code:msg.EXAMINEE_FETCH, content:examinee});
        });
    });
}

/**
 *  Updates an existing Examinee Record returning a {code, content} result
 */
function update(id, identification, name){
    return new Promise(function(resolve, reject){
        Examinee.findById(id).then(function(examinee){
            if(!examinee){ reject({code:msg.EXAMINEE_NOT_EXISTS}); return;}
            if(identification) examinee.identification = identification;
            if(name) examinee.name = name;
            Examinee.find({identification:examinee.identification, isDeleted:false, _id: {$ne: examinee._id}}).then(function(examinees){
                if(examinees.length>0) {reject({code:msg.EXAMINEE_EXISTS}); return;}
                examinee.save(function(){resolve({code:msg.EXAMINEE_UPDATED, content:examinee._id})});    
            });
        })
    });
}

function erase(id){
    return new Promise(function(resolve, reject){
        Examinee.findById(id).then(function(examinee){
            if(!examinee){ reject({code:msg.EXAMINEE_NOT_EXISTS}); return;}
            if(!utils.isEmpty(examinee.records)){reject({code:msg.EXAMINEE_HAS_RECORDS}); return;}
            examinee.isDeleted = true;
            examinee.save(function(){resolve({code:msg.EXAMINEE_DELETED, content:examinee._id})});    
        }).catch(function(res){reject(res)})
    });
}

/**
 * Searches for all Examinee Records returning a {code, content} result that may include the examinees' list
 */
function list(){
    return new Promise(function(resolve){
        Examinee.find({}).then(function(result){resolve({code: msg.EXAMINEES_FETCH, content:result});});
    });
}



module.exports = {create, get, update, erase, list};