const Examinee = require('../../Data/Examinee').Examinee;
const Record = require('../../Data/Examinee').Record;
const Test = require('../../Data/Examinee').Test;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new test on a examinee's record returning a {code, content} result
 */
function create(examineeId, recordId, testId){
    return new Promise(function(resolve, reject){
        Examinee.findById(examineeId).then(function(examinee){
            if(!examinee){reject({code:msg.EXAMINEE_NOT_EXISTS}); return;}
            var record = examinee.records.id(recordId);
            if(!record) {reject({code: msg.EXAMINEE_RECORD_NOT_EXISTS}); return;}
            var tests = record.tests;
            var itemsLikeIt = tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:testId, isDeleted:false})});
            if(itemsLikeIt.length > 0) {reject({code:msg.EXAMINEE_TEST_EXISTS}); return;}
            var newTest = new Test({testId, isDeleted:false});
            record.tests.push(newTest);
            examinee.save(function(){resolve({code:msg.EXAMINEE_TEST_REGISTER, content:newTest._id})});
        })
    });
}

/**
 * Searches for an examinee's test returning a {code, content} result that may contain the record
 */
function get(examineeId, recordId, testId){
    return new Promise(function(resolve, reject){
        Examinee.findById(examineeId).then(function(examinee){
            if(!examinee){reject({code:msg.EXAMINEE_NOT_EXISTS}); return;}
            var record = examinee.records.id(recordId);
            if(!record) {reject({code: msg.EXAMINEE_RECORD_NOT_EXIST}); return;}
            var test = record.tests.id(testId);
            if(!test) {reject({code:msg.EXAMINEE_TEST_NOT_EXISTS}); return;}
            resolve({code:msg.EXAMINEE_TEST_FETCH, content:test});
        });
    });
}

/**
 *  Updates an examinee's test returning a {code, content} result
 */
function update(examineeId, recordId, testId, newTestId){
    return new Promise(function(resolve, reject){
        Examinee.findById(examineeId).then(function(examinee){
            if(!examinee){reject({code:msg.EXAMINEE_NOT_EXISTS}); return;}
            var record = examinee.records.id(recordId);
            if(!record) {reject({code: msg.EXAMINEE_RECORD_NOT_EXISTS}); return;}
            var test = record.tests.id(testId);
            if(!test) {reject({code: msg.EXAMINEE_TEST_NOT_EXISTS}); return;}
            if(newTestId) test.testId = newTestId;
            var itemsLikeIt = record.tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:test.testId, isDeleted:false})});
            itemsLikeIt= utils.removeSelf(itemsLikeIt, test);
            if(itemsLikeIt.length > 0) {reject({code:msg.EXAMINEE_TEST_EXISTS}); return;}
            examinee.save(function(){resolve({code:msg.EXAMINEE_TEST_UPDATED, content:record._id})})
        });
    });
}

function erase(id, recordId, testId){
    return new Promise(function(resolve, reject){
        Examinee.findById(id).then(function(examinee){
            if(!examinee) {reject({code:msg.EXAMINEE_NOT_EXISTS}); return;}
            var record = examinee.records.id(recordId);
            if(!record) {reject({code: msg.EXAMINEE_RECORD_NOT_EXIST}); return;}
            var test = record.tests.id(testId);
            if(!test) {reject({code:msg.EXAMINEE_TEST_NOT_EXISTS}); return;}
            test.isDeleted = true;
            examinee.save(function(){resolve({code:msg.EXAMINEE_TEST_DELETED, content:test._id})})
        })
    });
}

/**
 * Searches for examinee's tests returning a {code, content} result that may include the tests' list
 */
function list(examineeId, recordId){
    return new Promise(function(resolve, reject){
        Examinee.findById(examineeId).then(function(examinee){
            if(!examinee)reject({code:msg.EXAMINEE_NOT_EXISTS});
            var record = examinee.records.id(recordId);
            if(!record) reject({code:msg.EXAMINEE_RECORD_NOT_EXISTS});
            resolve({code:msg.EXAMINEE_TESTS_FETCH, content:record.tests})
        });
    })
}

module.exports = {create, get, update, erase, list}