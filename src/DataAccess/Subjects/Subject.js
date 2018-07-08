const Subject = require('../../Data/Subject').Subject;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new Subject record returning a {code, content} result
 */
function create(name, field){
    return new Promise(function(resolve, reject){
        Subject.find({name:name, isDeleted:false}).then(function(subjects){
            if(subjects.length>0) {reject({code:msg.SUBJECT_EXISTS}); return;}
            var subject = new Subject({name:name, field:field, isDeleted:false});
            subject.save(function(){resolve({code:msg.SUBJECT_REGISTER, content:subject._id})});
        });
    });
}

/**
 * Searches for an Subject record returning a {code, content} result that may contain the record
 */
function get(id){
    return new Promise(function(resolve, reject){
        Subject.findById(id).then(function(subject){
            if(!subject) {reject({code:msg.SUBJECT_NOT_EXISTS}); return;}
            resolve({code:msg.SUBJECT_FETCH, content:subject});
        });
    });
}

/**
 *  Updates an existing Subject Record returning a {code, content} result
 */
function update(id, name, field){
    return new Promise(function(resolve, reject){
        Subject.findById(id).then(function(subject){
            if(!subject) {reject({code:msg.SUBJECT_NOT_EXISTS}); return;}
            if(name) subject.name = name;
            if(field) subject.field = field;
            Subject.find({name:subject.name, isDeleted:false, _id: {$ne: subject._id}}).then(function(subjects){
                if(subjects.length>0) {reject({code:msg.SUBJECT_EXISTS}); return;}
                subject.save(function(){resolve({code:msg.SUBJECT_UPDATED, content:subject._id})});    
            });
        })
    });
}

function erase(id){
    return new Promise(function(resolve, reject){
        Subject.findById(id).then(function(subject){
            if(!subject) {reject({code:msg.SUBJECT_NOT_EXISTS}); return;}
            if(!utils.isEmpty(subject.records)){reject({code:msg.SUBJECT_HAS_RECORDS}); return;}
            subject.isDeleted = true;
            subject.save(function(){resolve({code:msg.SUBJECT_DELETED, content:subject._id})});
        }).catch(function(res){reject(res)})
    });
}

/**
 * Searches for all Subject Records returning a {code, content} result that may include the subjects' list
 */
function list(){
    return new Promise(function(resolve){
        Subject.find({}).then(function(result){ resolve({code: msg.SUBJECTS_FETCH, content:result});});
    });
}

module.exports = {create, get, update, erase, list};