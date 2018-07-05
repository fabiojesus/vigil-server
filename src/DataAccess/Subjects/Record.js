const Subject = require('../../Data/Subject').Subject;
const Record = require('../../Data/Subject').Record;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new record record for an subject returning a {code, content} result
 */
function create(subjectId, year){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject)reject({code:msg.SUBJECT_NOT_EXISTS});
            else{
                var itemsLikeIt = subject.records.filter(function(currentItem){
                    return utils.isTheSame(currentItem, {year:year, active:true});
                });
                if(itemsLikeIt.length > 0) reject({code:msg.SUBJECT_RECORD_EXISTS});
                else{
                    var newRecord = new Record({year, active:true});
                    subject.records.push(newRecord);
                    subject.save(function(){resolve({code:msg.SUBJECT_RECORD_REGISTER, content:newRecord._id})});
                }
            }
        });
    });
}

/**
 * Searches for an subject's record record returning a {code, content} result that may contain the record
 */
function get(subjectId, recordId){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject)reject({code:msg.SUBJECT_NOT_EXISTS});
            else{
                var record = subject.records.id(recordId);
                if(!record) reject({code: msg.SUBJECT_RECORD_NOT_EXIST});
                else resolve({code:msg.SUBJECT_RECORD_FETCH, content:record});
            }
        });
    });
}

/**
 *  Updates an subject's record returning a {code, content} result
 */
function update(subjectId, recordId, year){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject)reject({code:msg.SUBJECT_NOT_EXISTS});
            else{
                var record = subject.records.id(recordId);
                if(!record) reject({code: msg.SUBJECT_RECORD_NOT_EXIST});
                else{
                    if(year) record.year = year;
                    var itemsLikeIt = subject.records.filter(function(currentItem){
                        return utils.isTheSame(currentItem, {year:record.year, active:true});
                    });
                    itemsLikeIt= utils.removeSelf(itemsLikeIt, record);
                    if(itemsLikeIt.length >0) reject({code:msg.SUBJECT_RECORD_EXISTS})
                    else{
                        subject.save(function(){resolve({code:msg.SUBJECT_RECORD_UPDATED, content:record._id})})
                    }   
                }
            }
        });
    });
}

/**
 *  Activates / Deactivates an subject's record record returning a {code, content} result
 */
function toggle(subjectId, recordId){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject)reject({code:msg.SUBJECT_NOT_EXISTS});
            else{
                var record = subject.records.id(recordId);
                if(!record) reject({code: msg.SUBJECT_RECORD_NOT_EXIST});
                else{
                    if(record.active){
                        record.active=false;
                        subject.save(function(){resolve({code:msg.SUBJECT_RECORD_TOGGLED, content:subject._id})})
                    }
                    else{
                        var itemsLikeIt = subject.records.filter(function(currentItem){
                            return utils.isTheSame(currentItem, {year:record.year, active:true});
                        });
                        itemsLikeIt = utils.removeSelf(itemsLikeIt, record);
                        if(itemsLikeIt.length >0) reject({code:msg.SUBJECT_RECORD_EXISTS})
                        else{
                            record.active=true;
                            subject.save(function(){resolve({code:msg.SUBJECT_RECORD_TOGGLED, content:record._id})})
                        }   
                    }
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
                var record = subject.records.id(recordId);
                if(!record) reject({code: msg.SUBJECT_RECORD_NOT_EXIST});
                else{
                    record.active = false;
                    subject.save(function(){resolve({code:msg.SUBJECT_RECORD_DELETED, content:record._id})});
                }
            }
        }).catch(function(res){reject(res)})
    });
}

/**
 * Searches for subject's records returning a {code, content} result that may include the Records' list
 */
function list(subjectId){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject) reject({code: msg.SUBJECT_NOT_EXISTS});
            else resolve({code:msg.SUBJECT_RECORDS_FETCH, content:subject.records});
        });
    })
}

module.exports = {create, get, update, toggle, erase, list}