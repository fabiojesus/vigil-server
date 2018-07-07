const Test = require('../../Data/Test').Test;
const Room = require('../../Data/Test').Room;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new room room for an test returning a {code, content} result
 */
function create(testId, roomId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test){reject({code:msg.TEST_NOT_EXISTS}); return;}
            var itemsLikeIt = test.rooms.filter(function(currentItem){return utils.isTheSame(currentItem, {roomId:roomId, isDeleted:false});});
            if(itemsLikeIt.length > 0) {reject({code:msg.TEST_ROOM_EXISTS}); return;}
            var newRoom = new Room({roomId, isDeleted:false});
            test.rooms.push(newRoom);
            test.save(function(){resolve({code:msg.TEST_ROOM_REGISTER, content:newRoom._id})});
        });
    });
}

/**
 * Searches for an test's room room returning a {code, content} result that may contain the room
 */
function get(testId, roomId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test){reject({code:msg.TEST_NOT_EXISTS}); return;}
            var room = test.rooms.id(roomId);
            if(!room) {reject({code: msg.TEST_ROOM_NOT_EXISTS}); return;}
            resolve({code:msg.TEST_ROOM_FETCH, content:room});
        });
    });
}

/**
 *  Updates an test's room returning a {code, content} result
 */
function update(testId, roomId, newRoomId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test){reject({code:msg.TEST_NOT_EXISTS}); return;}
            var room = test.rooms.id(roomId);
            if(!room) {reject({code: msg.TEST_ROOM_NOT_EXISTS}); return;}
            if(newRoomId) room.roomId = newRoomId;
            var itemsLikeIt = test.rooms.filter(function(currentItem){return utils.isTheSame(currentItem, {roomId:room.roomId, isDeleted:false});});
            itemsLikeIt= utils.removeSelf(itemsLikeIt, room);
            if(itemsLikeIt.length >0) {reject({code:msg.TEST_ROOM_EXISTS}); return;}
            test.save(function(){resolve({code:msg.TEST_ROOM_UPDATED, content:room._id})})
        });
    });
}

function erase(testId, roomId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test){reject({code:msg.TEST_NOT_EXISTS}); return;}
            var room = test.rooms.id(roomId);
            if(!room) {reject({code: msg.TEST_ROOM_NOT_EXIST}); return;}
            room.isDeleted = true;
            test.save(function(){resolve({code:msg.TEST_ROOM_DELETED, content:test._id})})
        });
    });
}

/**
 * Searches for test's rooms returning a {code, content} result that may include the Rooms' list
 */
function list(testId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test) {reject({code: msg.TEST_NOT_EXISTS}); return;}
            resolve({code:msg.TEST_ROOMS_FETCH, content:test.rooms});
        });
    })
}

module.exports = {create, get, update, erase, list}