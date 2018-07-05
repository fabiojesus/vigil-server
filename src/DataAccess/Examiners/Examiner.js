const Examiner = require('../../Data/Examiner').Examiner;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new Examiner record returning a {code, content} result
 */
function create(identification, name){
    return new Promise(function(resolve, reject){
        Examiner.find({identification:identification, active:true}).then(function(examiners){
            if(examiners.length>0) reject({code:msg.EXAMINER_EXISTS});
            else{
                var examiner = new Examiner({identification:identification, name:name, active:true});
                examiner.save(function(){resolve({code:msg.EXAMINER_REGISTER, content:examiner._id})});
            }
        });
    });
}

/**
 * Searches for an Examiner record returning a {code, content} result that may contain the record
 */
function get(id){
    return new Promise(function(resolve, reject){
        Examiner.findById(id).then(function(examiner){
            if(!examiner) reject({code:msg.EXAMINER_NOT_EXISTS});
            else resolve({code:msg.EXAMINER_FETCH, content:examiner});
        });
    });
}

/**
 *  Updates an existing Examiner Record returning a {code, content} result
 */
function update(id, identification, name){
    return new Promise(function(resolve, reject){
        Examiner.findById(id).then(function(examiner){
            if(!examiner){
                reject({code:msg.EXAMINER_NOT_EXISTS})
            }
            else{
                if(identification) examiner.identification = identification;
                if(name) examiner.name = name;
                Examiner.find({identification:examiner.identification, active:true, _id: {$ne: examiner._id}}).then(function(examiners){
                    if(examiners.length>0) reject({code:msg.EXAMINER_EXISTS})
                    else{
                        examiner.save(function(){resolve({code:msg.EXAMINER_UPDATED, content:examiner._id})});    
                    }
                });
            }
        });
    });
}

/**
 *  Activates / Deactivates an existing Examiner Record returning a {code, content} result
 */
function toggle(id){
    return new Promise(function(resolve, reject){
        Examiner.findById(id).then(function(examiner){
            if(!examiner){
                reject({code:msg.EXAMINER_NOT_EXISTS})
            }
            else{
                if(examiner.active){
                    examiner.active = false;
                    examiner.save(function(){resolve({code:msg.EXAMINER_TOGGLED, content:examiner._id})})
                }
                else{
                    Examiner.find({identification:examiner.identification, active:true, _id: {$ne: examiner._id}}).then(function(examiners){
                        if(examiners.length>0) reject({code:msg.EXAMINER_EXISTS})
                        else{
                            examiner.active = true;
                            examiner.save(function(){resolve({code:msg.EXAMINER_TOGGLED, content:examiner._id})});    
                        }
                    });
                }
            }
        });
    });
}

function erase(id){
    return new Promise(function(resolve, reject){
        Examiner.findById(id).then(function(examiner){
            if(!examiner) reject({code:msg.EXAMINER_NOT_EXISTS})
            else{
                examiner.active = false;
                examiner.save(function(){resolve({code:msg.EXAMINER_DELETED, content:examiner._id})});
            }
        }).catch(function(res){reject(res)})
    });
}

/**
 * Searches for all Examiner Records returning a {code, content} result that may include the examiners' list
 */
function list(){
    return new Promise(function(resolve, reject){
        Examiner.find({}).then(function(result){
            resolve({code: msg.EXAMINERS_FETCH, content:result});
        })
    });
}

module.exports = {create, get, update, toggle, erase, list};