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
            if(!room)reject({code:msg.ROOM_NOT_EXISTS});
            else{
                var record = room.records.id(recordId);
                if(!record) reject({code: msg.ROOM_RECORD_NOT_EXISTS});
                else{
                    var tests = record.tests;
                    var itemsLikeIt = tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:testId, active:true})});
                    if(itemsLikeIt.length > 0) reject({code:msg.ROOM_TEST_EXISTS})
                    else{
                        var newTest = new Test({testId, active:true});
                        record.tests.push(newTest);
                        room.save(function(){resolve({code:msg.ROOM_TEST_REGISTER, content:newTest._id})});
                    }
                }
            }
        })
    });
}

/**
 * Searches for an room's test returning a {code, content} result that may contain the record
 */
function get(roomId, recordId, testId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room)reject({code:msg.ROOM_NOT_EXISTS});
            else{
                var record = room.records.id(recordId);
                if(!record) reject({code: msg.ROOM_RECORD_NOT_EXIST});
                else{
                    var test = record.tests.id(testId);
                    if(!test) reject({code:msg.ROOM_TEST_NOT_EXISTS});
                    else resolve({code:msg.ROOM_TEST_FETCH, content:test});
                }
            }
        });
    });
}

/**
 *  Updates an room's test returning a {code, content} result
 */
function update(roomId, recordId, testId, newTestId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room)reject({code:msg.ROOM_NOT_EXISTS});
            else{
                var record = room.records.id(recordId);
                if(!record) reject({code: msg.ROOM_RECORD_NOT_EXISTS});
                else{
                    var test = record.tests.id(testId);
                    if(!test) reject({code: msg.ROOM_TEST_NOT_EXISTS});
                    else{
                        if(newTestId) test.testId = newTestId;
                        var itemsLikeIt = record.tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:test.testId, active:true})});
                        itemsLikeIt= utils.removeSelf(itemsLikeIt, test);
                        if(itemsLikeIt.length > 0) reject({code:msg.ROOM_TEST_EXISTS})
                        else{
                            room.save(function(){resolve({code:msg.ROOM_TEST_UPDATED, content:record._id})})
                        }    
                    }
                }
            }
        });
    });
}

/**
 *  Activates / Deactivates an room's test returning a {code, content} result
 */
function toggle(roomId, recordId, testId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room)reject({code:msg.ROOM_NOT_EXISTS});
            var record = room.records.id(recordId);
            if(!record) reject({code:msg.ROOM_RECORD_NOT_EXISTS});
            else{
                var test = record.tests.id(testId);
                if(!test) reject({code:msg.ROOM_TEST_NOT_EXISTS});
                else{
                    if(test.active){
                        test.active=false;
                        room.save(function(){resolve({code:msg.ROOM_TEST_TOGGLED, content:room._id})})
                    }
                    else{
                        var itemsLikeIt = record.tests.filter(function(currentItem){return utils.isTheSame(currentItem, {testId:test.testId, active:true})});
                        itemsLikeIt= utils.removeSelf(itemsLikeIt, test);
                        if(itemsLikeIt.length > 0) reject({code:msg.ROOM_TEST_EXISTS})
                        else{
                            test.active=true;
                            room.save(function(){resolve({code:msg.ROOM_TEST_TOGGLED, content:test._id})})
                        }
                    }
                }
            }
        });
    });
}

/**
 * Searches for room's tests returning a {code, content} result that may include the tests' list
 */
function list(roomId, recordId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room)reject({code:msg.ROOM_NOT_EXISTS});
            var record = room.records.id(recordId);
            if(!record) reject({code:msg.ROOM_RECORD_NOT_EXISTS});
            resolve({code:msg.ROOM_TESTS_FETCH, content:record.tests})
        });
    })
}

module.exports = {create, get, update, toggle, list}