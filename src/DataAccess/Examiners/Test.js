const Examiner = require('../../Data/Examiner').Examiner;
const Record = require('../../Data/Examiner').Record;
const Test = require('../../Data/Examiner').Test;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new test on a examiner's record returning a {code, content} result
 */
function create(examinerId, recordId, testId){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner)reject({code:msg.EXAMINER_NOT_EXISTS});
            else{
                var record = examiner.records.id(recordId);
                if(!record) reject({code: msg.EXAMINER_RECORD_NOT_EXISTS});
                else{
                    var tests = record.tests;
                    var itemsLikeIt = tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:testId, active:true})});
                    if(itemsLikeIt.length > 0) reject({code:msg.EXAMINER_TEST_EXISTS})
                    else{
                        var newTest = new Test({testId, active:true});
                        record.tests.push(newTest);
                        examiner.save(function(){resolve({code:msg.EXAMINER_TEST_REGISTER, content:newTest._id})});
                    }
                }
            }
        })
    });
}

/**
 * Searches for an examiner's test returning a {code, content} result that may contain the record
 */
function get(examinerId, recordId, testId){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner)reject({code:msg.EXAMINER_NOT_EXISTS});
            else{
                var record = examiner.records.id(recordId);
                if(!record) reject({code: msg.EXAMINER_RECORD_NOT_EXIST});
                else{
                    var test = record.tests.id(testId);
                    if(!test) reject({code:msg.EXAMINER_TEST_NOT_EXISTS});
                    else resolve({code:msg.EXAMINER_TEST_FETCH, content:test});
                }
            }
        });
    });
}

/**
 *  Updates an examiner's test returning a {code, content} result
 */
function update(examinerId, recordId, testId, newTestId){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner)reject({code:msg.EXAMINER_NOT_EXISTS});
            else{
                var record = examiner.records.id(recordId);
                if(!record) reject({code: msg.EXAMINER_RECORD_NOT_EXISTS});
                else{
                    var test = record.tests.id(testId);
                    if(!test) reject({code: msg.EXAMINER_TEST_NOT_EXISTS});
                    else{
                        if(newTestId) test.testId = newTestId;
                        var itemsLikeIt = record.tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:test.testId, active:true})});
                        itemsLikeIt= utils.removeSelf(itemsLikeIt, test);
                        if(itemsLikeIt.length > 0) reject({code:msg.EXAMINER_TEST_EXISTS})
                        else{
                            examiner.save(function(){resolve({code:msg.EXAMINER_TEST_UPDATED, content:record._id})})
                        }    
                    }
                }
            }
        });
    });
}

/**
 *  Activates / Deactivates an examiner's test returning a {code, content} result
 */
function toggle(examinerId, recordId, testId){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner)reject({code:msg.EXAMINER_NOT_EXISTS});
            var record = examiner.records.id(recordId);
            if(!record) reject({code:msg.EXAMINER_RECORD_NOT_EXISTS});
            else{
                var test = record.tests.id(testId);
                if(!test) reject({code:msg.EXAMINER_TEST_NOT_EXISTS});
                else{
                    if(test.active){
                        test.active=false;
                        examiner.save(function(){resolve({code:msg.EXAMINER_TEST_TOGGLED, content:examiner._id})})
                    }
                    else{
                        var itemsLikeIt = record.tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:test.testId, active:true})});
                        itemsLikeIt= utils.removeSelf(itemsLikeIt, test);
                        if(itemsLikeIt.length > 0) reject({code:msg.EXAMINER_TEST_EXISTS})
                        else{
                            test.active=true;
                            examiner.save(function(){resolve({code:msg.EXAMINER_TEST_TOGGLED, content:test._id})})
                        }
                    }
                }
            }
        });
    });
}

/**
 * Searches for examiner's tests returning a {code, content} result that may include the tests' list
 */
function list(examinerId, recordId){
    return new Promise(function(resolve, reject){
        Examiner.findById(examinerId).then(function(examiner){
            if(!examiner)reject({code:msg.EXAMINER_NOT_EXISTS});
            var record = examiner.records.id(recordId);
            if(!record) reject({code:msg.EXAMINER_RECORD_NOT_EXISTS});
            resolve({code:msg.EXAMINER_TESTS_FETCH, content:record.tests})
        });
    })
}

module.exports = {create, get, update, toggle, list}