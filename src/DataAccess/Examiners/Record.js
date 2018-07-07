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
            if(!examiner){reject({code:msg.EXAMINER_NOT_EXISTS}); return;}
            var itemsLikeIt = examiner.records.filter(function(currentItem){return utils.isTheSame(currentItem, {year:year, isDeleted:false});});
            if(itemsLikeIt.length > 0) {reject({code:msg.EXAMINER_RECORD_EXISTS}); return;}
            var newRecord = new Record({year, isDeleted:false});
            examiner.records.push(newRecord);
            examiner.save(function(){resolve({code:msg.EXAMINER_RECORD_REGISTER, content:newRecord._id})});
        });
    });
}

/**
 * Searches for an examiner's record record returning a {code, content} result that may contain the record
 */
function get(examinerId, recordId){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner){reject({code:msg.EXAMINER_NOT_EXISTS}); return;}
            var record = examiner.records.id(recordId);
            if(!record) {reject({code: msg.EXAMINER_RECORD_NOT_EXIST}); return;}
            resolve({code:msg.EXAMINER_RECORD_FETCH, content:record});
        });
    });
}

/**
 *  Updates an examiner's record returning a {code, content} result
 */
function update(examinerId, recordId, year){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner){reject({code:msg.EXAMINER_NOT_EXISTS}); return;}
            var record = examiner.records.id(recordId);
            if(!record) {reject({code: msg.EXAMINER_RECORD_NOT_EXIST}); return;}
            if(year) record.year = year;
            var itemsLikeIt = examiner.records.filter(function(currentItem){return utils.isTheSame(currentItem, {year:record.year, isDeleted:false});});
            itemsLikeIt= utils.removeSelf(itemsLikeIt, record);
            if(itemsLikeIt.length >0) {reject({code:msg.EXAMINER_RECORD_EXISTS}); return;}
            examiner.save(function(){resolve({code:msg.EXAMINER_RECORD_UPDATED, content:record._id})})
        });
    });
}

function erase(id){
    return new Promise(function(resolve, reject){
        Examiner.findById(id).then(function(examiner){
            if(!examiner) {reject({code:msg.EXAMINER_NOT_EXISTS}); return;}
            var record = examiner.records.id(recordId);
            if(!record) {reject({code: msg.EXAMINER_RECORD_NOT_EXIST}); return;}
            if(!isEmpty(record.tests)){reject({code:msg.EXAMINER_RECORD_HAS_TESTS}); return;}
            record.isDeleted = true;
            examiner.save(function(){resolve({code:msg.EXAMINER_RECORD_DELETED, content:record._id})});
        }).catch(function(res){reject(res)})
    });
}

/**
 * Searches for examiner's records returning a {code, content} result that may include the Records' list
 */
function list(examinerId){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner) {reject({code: msg.EXAMINER_NOT_EXISTS}); return;}
            resolve({code:msg.EXAMINER_RECORDS_FETCH, content:examiner.records});
        });
    })
}

module.exports = {create, get, update, erase, list}