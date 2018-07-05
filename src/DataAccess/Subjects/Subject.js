const Subject = require('../../Data/Subject').Subject;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new Subject record returning a {code, content} result
 */
function create(name, field){
    return new Promise(function(resolve, reject){
        Subject.find({name:name, active:true}).then(function(subjects){
            if(subjects.length>0) reject({code:msg.SUBJECT_EXISTS});
            else{
                var subject = new Subject({name:name, field:field, active:true});
                subject.save(function(){resolve({code:msg.SUBJECT_REGISTER, content:subject._id})});
            }
        });
    });
}

/**
 * Searches for an Subject record returning a {code, content} result that may contain the record
 */
function get(id){
    return new Promise(function(resolve, reject){
        Subject.findById(id).then(function(subject){
            if(!subject) reject({code:msg.SUBJECT_NOT_EXISTS});
            else resolve({code:msg.SUBJECT_FETCH, content:subject});
        });
    });
}

/**
 *  Updates an existing Subject Record returning a {code, content} result
 */
function update(id, name, field){
    return new Promise(function(resolve, reject){
        Subject.findById(id).then(function(subject){
            if(!subject) reject({code:msg.SUBJECT_NOT_EXISTS})
            else{
                if(name) subject.name = name;
                if(field) subject.field = field;
                Subject.find({name:subject.name, active:true, _id: {$ne: subject._id}}).then(function(subjects){
                    if(subjects.length>0) reject({code:msg.SUBJECT_EXISTS})
                    else{
                        subject.save(function(){resolve({code:msg.SUBJECT_UPDATED, content:subject._id})});    
                    }
                });
            }
        })
    });
}

/**
 *  Activates / Deactivates an existing Subject Record returning a {code, content} result
 */
function toggle(id){
    return new Promise(function(resolve, reject){
        Subject.findById(id).then(function(subject){
            if(!subject) reject({code:msg.SUBJECT_NOT_EXISTS})
            else{
                if(subject.active){
                    subject.active = false;
                    subject.save(function(){resolve({code:msg.SUBJECT_TOGGLED, content:subject._id})})
                }
                else{
                    Subject.find({name:subject.name, active:true, _id: {$ne: subject._id}}).then(function(subjects){
                        if(subjects.length>0) reject({code:msg.SUBJECT_EXISTS})
                        else{
                            subject.active = true;
                            subject.save(function(){resolve({code:msg.SUBJECT_TOGGLED, content:subject._id})});    
                        }
                    });
                }
            }
        });
    });
}

function erase(id){
    return new Promise(function(resolve, reject){
        Subject.findById(id).then(function(subject){
            if(!subject) reject({code:msg.SUBJECT_NOT_EXISTS})
            else{
                subject.active = false;
                subject.save(function(){resolve({code:msg.SUBJECT_DELETED, content:subject._id})});
            }
        }).catch(function(res){reject(res)})
    });
}

/**
 * Searches for all Subject Records returning a {code, content} result that may include the subjects' list
 */
function list(){
    return new Promise(function(resolve, reject){
        Subject.find({}).then(function(result){
            resolve({code: msg.SUBJECTS_FETCH, content:result});
        });
    });
}

module.exports = {create, get, update, toggle, erase, list};