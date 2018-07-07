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
            if(!subject) {reject({code:msg.SUBJECT_NOT_EXISTS}); return;}
            var record = subject.records.id(recordId);
            if(!record) {reject({code: msg.SUBJECT_RECORD_NOT_EXISTS}); return;}
            var tests = record.tests;
            var itemsLikeIt = tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:testId, isDeleted:false})});
            if(itemsLikeIt.length > 0) {reject({code:msg.SUBJECT_TEST_EXISTS}); return;}
            var newTest = new Test({testId, isDeleted:false});
            record.tests.push(newTest);
            subject.save(function(){resolve({code:msg.SUBJECT_TEST_REGISTER, content:newTest._id})});
        });
    });
}

/**
 * Searches for an subject's test returning a {code, content} result that may contain the record
 */
function get(subjectId, recordId, testId){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject){reject({code:msg.SUBJECT_NOT_EXISTS}); return;}
            var record = subject.records.id(recordId);
            if(!record) {reject({code: msg.SUBJECT_RECORD_NOT_EXIST});return;}
            var test = record.tests.id(testId);
            if(!test) {reject({code:msg.SUBJECT_TEST_NOT_EXISTS}); return;}
            resolve({code:msg.SUBJECT_TEST_FETCH, content:test});
        });
    });
}

/**
 *  Updates an subject's test returning a {code, content} result
 */
function update(subjectId, recordId, testId, newTestId){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject){reject({code:msg.SUBJECT_NOT_EXISTS}); return;}
            var record = subject.records.id(recordId);
            if(!record) {reject({code: msg.SUBJECT_RECORD_NOT_EXISTS}); return;}
            var test = record.tests.id(testId);
            if(!test) {reject({code: msg.SUBJECT_TEST_NOT_EXISTS}); return;}
            if(newTestId) test.testId = newTestId;
            var itemsLikeIt = record.tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:test.testId, isDeleted:false})});
            itemsLikeIt= utils.removeSelf(itemsLikeIt, test);
            if(itemsLikeIt.length > 0) {reject({code:msg.SUBJECT_TEST_EXISTS}); return;}
            subject.save(function(){resolve({code:msg.SUBJECT_TEST_UPDATED, content:record._id})})
        });
    });
}

function erase(id){
    return new Promise(function(resolve, reject){
        Subject.findById(id).then(function(subject){
            if(!subject) {reject({code:msg.SUBJECT_NOT_EXISTS}); return;}
            var record = subject.records.id(recordId);
            if(!record) {reject({code: msg.SUBJECT_RECORD_NOT_EXIST}); return;}
            var test = record.tests.id(testId);
            if(!test) {reject({code:msg.SUBJECT_TEST_NOT_EXISTS}); return;}
            test.active = false;
            resolve({code:msg.SUBJECT_TEST_DELETED, content:test._id})
        });
    });
}

/**
 * Searches for subject's tests returning a {code, content} result that may include the tests' list
 */
function list(subjectId, recordId){
    return new Promise(function(resolve, reject){
        Subject.findById(subjectId).then(function(subject){
            if(!subject){reject({code:msg.SUBJECT_NOT_EXISTS}); return;}
            var record = subject.records.id(recordId);
            if(!record) {reject({code:msg.SUBJECT_RECORD_NOT_EXISTS});}
            resolve({code:msg.SUBJECT_TESTS_FETCH, content:record.tests})
        });
    })
}

module.exports = {create, get, update, erase, list}