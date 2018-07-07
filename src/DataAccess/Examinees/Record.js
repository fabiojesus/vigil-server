const Examinee = require('../../Data/Examinee').Examinee;
const Record = require('../../Data/Examinee').Record;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new record record for an examinee returning a {code, content} result
 */
function create(examineeId, year, course, studentNumber){
    return new Promise(function(resolve, reject){
        Examinee.findById(examineeId).then(function(examinee){
            if(!examinee){reject({code:msg.EXAMINEE_NOT_EXISTS}); return;}
            var itemsLikeIt = examinee.records.filter(function(currentItem){
                return utils.isTheSame(currentItem, {year:year, studentNumber:studentNumber, isDeleted:false});
            });
            if(itemsLikeIt.length > 0) {reject({code:msg.EXAMINEE_RECORD_EXISTS}); return;}
            var newRecord = new Record({year, course, studentNumber, isDeleted:false});
            examinee.records.push(newRecord);
            examinee.save(function(){resolve({code:msg.EXAMINEE_RECORD_REGISTER, content:newRecord._id})});
        });
    });
}

/**
 * Searches for an examinee's record record returning a {code, content} result that may contain the record
 */
function get(examineeId, recordId){
    return new Promise(function(resolve, reject){
        Examinee.findById(examineeId).then(function(examinee){
            if(!examinee){reject({code:msg.EXAMINEE_NOT_EXISTS}); return;}
            var record = examinee.records.id(recordId);
            if(!record) {reject({code: msg.EXAMINEE_RECORD_NOT_EXIST}); return;}
            resolve({code:msg.EXAMINEE_RECORD_FETCH, content:record});
        });
    });
}

/**
 *  Updates an examinee's record returning a {code, content} result
 */
function update(examineeId, recordId, year, course, studentNumber){
    return new Promise(function(resolve, reject){
        Examinee.findById(examineeId).then(function(examinee){
            if(!examinee){reject({code:msg.EXAMINEE_NOT_EXISTS}); return;}
            var record = examinee.records.id(recordId);
            if(!record) {reject({code: msg.EXAMINEE_RECORD_NOT_EXIST}); return;}
            if(year) record.year = year;
            if(course) record.course = course;
            if(studentNumber) record.studentNumber = studentNumber;
            var itemsLikeIt = examinee.records.filter(function(currentItem){
                return utils.isTheSame(currentItem, {year:record.year, studentNumber:record.studentNumber, isDeleted:false});
            });
            itemsLikeIt= utils.removeSelf(itemsLikeIt, record);
            if(itemsLikeIt.length >0) {reject({code:msg.EXAMINEE_RECORD_EXISTS}); return;}
            examinee.save(function(){resolve({code:msg.EXAMINEE_RECORD_UPDATED, content:record._id})})
        });
    });
}

function erase(id){
    return new Promise(function(resolve, reject){
        Examinee.findById(id).then(function(examinee){
            if(!examinee){reject({code:msg.EXAMINEE_NOT_EXISTS}); return;}
            var record = examinee.records.id(recordId);
            if(!record) {reject({code: msg.EXAMINEE_RECORD_NOT_EXIST});return;}
            if(!isEmpty(record.tests)){reject({code:msg.EXAMINEE_RECORD_HAS_TESTS}); return;}
            record.isDeleted = true;
            examinee.save(function(){resolve({code:msg.EXAMINEE_RECORD_DELETED, content:record._id})});    
        }).catch(function(res){reject(res)})
    });
}

/**
 * Searches for examinee's records returning a {code, content} result that may include the Records' list
 */
function list(examineeId){
    return new Promise(function(resolve, reject){
        Examinee.findById(examineeId).then(function(examinee){
            if(!examinee) {reject({code: msg.EXAMINEE_NOT_EXISTS});return;}
            resolve({code:msg.EXAMINEE_RECORDS_FETCH, content:examinee.records});
        });
    })
}

module.exports = {create, get, update, erase, list}