const Room = require('../../Data/Room').Room;
const Record = require('../../Data/Room').Record;
const Test = require('../../Data/Room').Test;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');


/**
 * Creates a new test on a room's record returning a {code, content} result
 */
function create(roomId, recordId, testId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room){reject({code:msg.ROOM_NOT_EXISTS}); return;}
            var record = room.records.id(recordId);
            if(!record) {reject({code: msg.ROOM_RECORD_NOT_EXISTS}); return;}
            var tests = record.tests;
            var itemsLikeIt = tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:testId, isDeleted:false})});
            if(itemsLikeIt.length > 0) {reject({code:msg.ROOM_TEST_EXISTS}); return;}
            var newTest = new Test({testId, isDeleted:false});
            record.tests.push(newTest);
            room.save(function(){resolve({code:msg.ROOM_TEST_REGISTER, content:newTest._id})});
        });
    });
}

/**
 * Searches for an room's test returning a {code, content} result that may contain the record
 */
function get(roomId, recordId, testId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room) {reject({code:msg.ROOM_NOT_EXISTS}); return;}
            var record = room.records.id(recordId);
            if(!record) {reject({code: msg.ROOM_RECORD_NOT_EXIST}); return;}
            var test = record.tests.id(testId);
            if(!test) {reject({code:msg.ROOM_TEST_NOT_EXISTS}); return;}
            resolve({code:msg.ROOM_TEST_FETCH, content:test});
        });
    });
}

/**
 *  Updates an room's test returning a {code, content} result
 */
function update(roomId, recordId, testId, newTestId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room) {reject({code:msg.ROOM_NOT_EXISTS}); return;}
            var record = room.records.id(recordId);
            if(!record) {reject({code: msg.ROOM_RECORD_NOT_EXISTS}); return;}
            var test = record.tests.id(testId);
            if(!test) {reject({code: msg.ROOM_TEST_NOT_EXISTS}); return;}
            if(newTestId) test.testId = newTestId;
            var itemsLikeIt = record.tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:test.testId, isDeleted:false})});
            itemsLikeIt= utils.removeSelf(itemsLikeIt, test);
            if(itemsLikeIt.length > 0) {reject({code:msg.ROOM_TEST_EXISTS}); return;}
            room.save(function(){resolve({code:msg.ROOM_TEST_UPDATED, content:record._id})})
        });
    });
}

function erase(id){
    return new Promise(function(resolve, reject){
        Room.findById(id).then(function(room){
            if(!room) {reject({code:msg.ROOM_NOT_EXISTS}); return;}
            var record = room.records.id(recordId);
            if(!record) {reject({code: msg.ROOM_RECORD_NOT_EXIST}); return;}
            var test = record.tests.id(testId);
            if(!test) {reject({code:msg.ROOM_TEST_NOT_EXISTS}); return;}
            test.isDeleted = true;
            room.save(function(){resolve({code:msg.ROOM_TEST_DELETED, content:test._id})});
        });
    });
}

/**
 * Searches for room's tests returning a {code, content} result that may include the tests' list
 */
function list(roomId, recordId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room) {reject({code:msg.ROOM_NOT_EXISTS}); return;}
            var record = room.records.id(recordId);
            if(!record) {reject({code:msg.ROOM_RECORD_NOT_EXISTS}); return;}
            resolve({code:msg.ROOM_TESTS_FETCH, content:record.tests})
        });
    })
}

module.exports = {create, get, update, erase, list}