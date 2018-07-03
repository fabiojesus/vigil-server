const Examiner = require('../../Data/Examiner').Examiner;
const Record = require('../../Data/Examiner').Record;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new record record for an examiner returning a {code, content} result
 */
function create(examinerId, year){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner)reject({code:msg.EXAMINER_NOT_EXISTS});
            else{
                var itemsLikeIt = examiner.records.filter(function(currentItem){
                    return utils.isTheSame(currentItem, {year:year, active:true});
                });
                if(itemsLikeIt.length > 0) reject({code:msg.EXAMINER_RECORD_EXISTS});
                else{
                    var newRecord = new Record({year, active:true});
                    examiner.records.push(newRecord);
                    examiner.save(function(){resolve({code:msg.EXAMINER_RECORD_REGISTER, content:newRecord._id})});
                }
            }
        });
    });
}

/**
 * Searches for an examiner's record record returning a {code, content} result that may contain the record
 */
function get(examinerId, recordId){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner)reject({code:msg.EXAMINER_NOT_EXISTS});
            else{
                var record = examiner.records.id(recordId);
                if(!record) reject({code: msg.EXAMINER_RECORD_NOT_EXIST});
                else resolve({code:msg.EXAMINER_RECORD_FETCH, content:record});
            }
        });
    });
}

/**
 *  Updates an examiner's record returning a {code, content} result
 */
function update(examinerId, recordId, year){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner)reject({code:msg.EXAMINER_NOT_EXISTS});
            else{
                var record = examiner.records.id(recordId);
                if(!record) reject({code: msg.EXAMINER_RECORD_NOT_EXIST});
                else{
                    if(year) record.year = year;
                    var itemsLikeIt = examiner.records.filter(function(currentItem){
                        return utils.isTheSame(currentItem, {year:record.year, active:true});
                    });
                    itemsLikeIt= utils.removeSelf(itemsLikeIt, record);
                    if(itemsLikeIt.length >0) reject({code:msg.EXAMINER_RECORD_EXISTS})
                    else{
                        examiner.save(function(){resolve({code:msg.EXAMINER_RECORD_UPDATED, content:record._id})})
                    }   
                }
            }
        });
    });
}

/**
 *  Activates / Deactivates an examiner's record record returning a {code, content} result
 */
function toggle(examinerId, recordId){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner)reject({code:msg.EXAMINER_NOT_EXISTS});
            else{
                var record = examiner.records.id(recordId);
                if(!record) reject({code: msg.EXAMINER_RECORD_NOT_EXIST});
                else{
                    if(record.active){
                        record.active=false;
                        examiner.save(function(){resolve({code:msg.EXAMINER_RECORD_TOGGLED, content:examiner._id})})
                    }
                    else{
                        var itemsLikeIt = examiner.records.filter(function(currentItem){
                            return utils.isTheSame(currentItem, {year:record.year, active:true});
                        });
                        itemsLikeIt = utils.removeSelf(itemsLikeIt, record);
                        if(itemsLikeIt.length >0) reject({code:msg.EXAMINER_RECORD_EXISTS})
                        else{
                            record.active=true;
                            examiner.save(function(){resolve({code:msg.EXAMINER_RECORD_TOGGLED, content:record._id})})
                        }   
                    }
                }
            }
        });
    });
}

/**
 * Searches for examiner's records returning a {code, content} result that may include the Records' list
 */
function list(examinerId){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner) reject({code: msg.EXAMINER_NOT_EXISTS});
            else resolve({code:msg.EXAMINER_RECORDS_FETCH, content:examiner.records});
        });
    })
}

module.exports = {create, get, update, toggle, list}