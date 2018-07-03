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
            if(!examinee)reject({code:msg.EXAMINEE_NOT_EXISTS});
            else{
                var itemsLikeIt = examinee.records.filter(function(currentItem){
                    return utils.isTheSame(currentItem, {year:year, studentNumber:studentNumber, active:true});
                });
                if(itemsLikeIt.length > 0) reject({code:msg.EXAMINEE_RECORD_EXISTS});
                else{
                    var newRecord = new Record({year, course, studentNumber, active:true});
                    examinee.records.push(newRecord);
                    examinee.save(function(){resolve({code:msg.EXAMINEE_RECORD_REGISTER, content:newRecord._id})});
                }
            }
        });
    });
}

/**
 * Searches for an examinee's record record returning a {code, content} result that may contain the record
 */
function get(examineeId, recordId){
    return new Promise(function(resolve, reject){
        Examinee.findById(examineeId).then(function(examinee){
            if(!examinee)reject({code:msg.EXAMINEE_NOT_EXISTS});
            else{
                var record = examinee.records.id(recordId);
                if(!record) reject({code: msg.EXAMINEE_RECORD_NOT_EXIST});
                else resolve({code:msg.EXAMINEE_RECORD_FETCH, content:record});
            }
        });
    });
}

/**
 *  Updates an examinee's record returning a {code, content} result
 */
function update(examineeId, recordId, year, course, studentNumber){
    return new Promise(function(resolve, reject){
        Examinee.findById(examineeId).then(function(examinee){
            if(!examinee)reject({code:msg.EXAMINEE_NOT_EXISTS});
            else{
                var record = examinee.records.id(recordId);
                if(!record) reject({code: msg.EXAMINEE_RECORD_NOT_EXIST});
                else{
                    if(year) record.year = year;
                    if(course) record.course = course;
                    if(studentNumber) record.studentNumber = studentNumber;
                    var itemsLikeIt = examinee.records.filter(function(currentItem){
                        return utils.isTheSame(currentItem, {year:record.year, studentNumber:record.studentNumber, active:true});
                    });
                    itemsLikeIt= utils.removeSelf(itemsLikeIt, record);
                    if(itemsLikeIt.length >0) reject({code:msg.EXAMINEE_RECORD_EXISTS})
                    else{
                        examinee.save(function(){resolve({code:msg.EXAMINEE_RECORD_UPDATED, content:record._id})})
                    }   
                }
            }
        });
    });
}

/**
 *  Activates / Deactivates an examinee's record record returning a {code, content} result
 */
function toggle(examineeId, recordId){
    return new Promise(function(resolve, reject){
        Examinee.findById(examineeId).then(function(examinee){
            if(!examinee)reject({code:msg.EXAMINEE_NOT_EXISTS});
            else{
                var record = examinee.records.id(recordId);
                if(!record) reject({code: msg.EXAMINEE_RECORD_NOT_EXIST});
                else{
                    if(record.active){
                        record.active=false;
                        examinee.save(function(){resolve({code:msg.EXAMINEE_RECORD_TOGGLED, content:examinee._id})})
                    }
                    else{
                        var itemsLikeIt = examinee.records.filter(function(currentItem){
                            return utils.isTheSame(currentItem, {year:record.year, studentNumber:record.studentNumber, active:true});
                        });
                        itemsLikeIt = utils.removeSelf(itemsLikeIt, record);
                        if(itemsLikeIt.length >0) reject({code:msg.EXAMINEE_RECORD_EXISTS})
                        else{
                            record.active=true;
                            examinee.save(function(){resolve({code:msg.EXAMINEE_RECORD_TOGGLED, content:record._id})})
                        }   
                    }
                }
            }
        });
    });
}

/**
 * Searches for examinee's records returning a {code, content} result that may include the Records' list
 */
function list(examineeId){
    return new Promise(function(resolve, reject){
        Examinee.findById(examineeId).then(function(examinee){
            if(!examinee) reject({code: msg.EXAMINEE_NOT_EXISTS});
            else resolve({code:msg.EXAMINEE_RECORDS_FETCH, content:examinee.records});
        });
    })
}

module.exports = {create, get, update, toggle, list}