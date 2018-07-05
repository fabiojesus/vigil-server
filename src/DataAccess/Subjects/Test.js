const Subject = require('../../Data/Subject').Subject;
const Record = require('../../Data/Subject').Record;
const Test = require('../../Data/Subject').Test;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new test on a subject's record returning a {code, content} result
 */
function create(subjectId, recordId, testId){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject)reject({code:msg.SUBJECT_NOT_EXISTS});
            else{
                var record = subject.records.id(recordId);
                if(!record) reject({code: msg.SUBJECT_RECORD_NOT_EXISTS});
                else{
                    var tests = record.tests;
                    var itemsLikeIt = tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:testId, active:true})});
                    if(itemsLikeIt.length > 0) reject({code:msg.SUBJECT_TEST_EXISTS})
                    else{
                        var newTest = new Test({testId, active:true});
                        record.tests.push(newTest);
                        subject.save(function(){resolve({code:msg.SUBJECT_TEST_REGISTER, content:newTest._id})});
                    }
                }
            }
        })
    });
}

/**
 * Searches for an subject's test returning a {code, content} result that may contain the record
 */
function get(subjectId, recordId, testId){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject)reject({code:msg.SUBJECT_NOT_EXISTS});
            else{
                var record = subject.records.id(recordId);
                if(!record) reject({code: msg.SUBJECT_RECORD_NOT_EXIST});
                else{
                    var test = record.tests.id(testId);
                    if(!test) reject({code:msg.SUBJECT_TEST_NOT_EXISTS});
                    else resolve({code:msg.SUBJECT_TEST_FETCH, content:test});
                }
            }
        });
    });
}

/**
 *  Updates an subject's test returning a {code, content} result
 */
function update(subjectId, recordId, testId, newTestId){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject)reject({code:msg.SUBJECT_NOT_EXISTS});
            else{
                var record = subject.records.id(recordId);
                if(!record) reject({code: msg.SUBJECT_RECORD_NOT_EXISTS});
                else{
                    var test = record.tests.id(testId);
                    if(!test) reject({code: msg.SUBJECT_TEST_NOT_EXISTS});
                    else{
                        if(newTestId) test.testId = newTestId;
                        var itemsLikeIt = record.tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:test.testId, active:true})});
                        itemsLikeIt= utils.removeSelf(itemsLikeIt, test);
                        if(itemsLikeIt.length > 0) reject({code:msg.SUBJECT_TEST_EXISTS})
                        else{
                            subject.save(function(){resolve({code:msg.SUBJECT_TEST_UPDATED, content:record._id})})
                        }    
                    }
                }
            }
        });
    });
}

/**
 *  Activates / Deactivates an subject's test returning a {code, content} result
 */
function toggle(subjectId, recordId, testId){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject)reject({code:msg.SUBJECT_NOT_EXISTS});
            var record = subject.records.id(recordId);
            if(!record) reject({code:msg.SUBJECT_RECORD_NOT_EXISTS});
            else{
                var test = record.tests.id(testId);
                if(!test) reject({code:msg.SUBJECT_TEST_NOT_EXISTS});
                else{
                    if(test.active){
                        test.active=false;
                        subject.save(function(){resolve({code:msg.SUBJECT_TEST_TOGGLED, content:subject._id})})
                    }
                    else{
                        var itemsLikeIt = record.tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:test.testId, active:true})});
                        itemsLikeIt= utils.removeSelf(itemsLikeIt, test);
                        if(itemsLikeIt.length > 0) reject({code:msg.SUBJECT_TEST_EXISTS})
                        else{
                            test.active=true;
                            subject.save(function(){resolve({code:msg.SUBJECT_TEST_TOGGLED, content:test._id})})
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
                    var test = record.tests.id(testId);
                    if(!test) reject({code:msg.SUBJECT_TEST_NOT_EXISTS});
                    else{
                        test.active = false;
                        resolve({code:msg.SUBJECT_TEST_DELETED, content:test._id})
                    }
                }
            }
        })
    });
}

/**
 * Searches for subject's tests returning a {code, content} result that may include the tests' list
 */
function list(subjectId, recordId){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject)reject({code:msg.SUBJECT_NOT_EXISTS});
            var record = subject.records.id(recordId);
            if(!record) reject({code:msg.SUBJECT_RECORD_NOT_EXISTS});
            resolve({code:msg.SUBJECT_TESTS_FETCH, content:record.tests})
        });
    })
}

module.exports = {create, get, update, toggle, erase, list}