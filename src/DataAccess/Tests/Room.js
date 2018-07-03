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
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var itemsLikeIt = test.rooms.filter(function(currentItem){
                    return utils.isTheSame(currentItem, {roomId:roomId, active:true});
                });
                if(itemsLikeIt.length > 0) reject({code:msg.TEST_ROOM_EXISTS});
                else{
                    var newRoom = new Room({roomId, active:true});
                    test.rooms.push(newRoom);
                    test.save(function(){resolve({code:msg.TEST_ROOM_REGISTER, content:newRoom._id})});
                }
            }
        });
    });
}

/**
 * Searches for an test's room room returning a {code, content} result that may contain the room
 */
function get(testId, roomId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var room = test.rooms.id(roomId);
                if(!room) reject({code: msg.TEST_ROOM_NOT_EXISTS});
                else resolve({code:msg.TEST_ROOM_FETCH, content:room});
            }
        });
    });
}

/**
 *  Updates an test's room returning a {code, content} result
 */
function update(testId, roomId, newRoomId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var room = test.rooms.id(roomId);
                if(!room) reject({code: msg.TEST_ROOM_NOT_EXISTS});
                else{
                    if(newRoomId) room.roomId = newRoomId;
                    var itemsLikeIt = test.rooms.filter(function(currentItem){
                        return utils.isTheSame(currentItem, {roomId:room.roomId, active:true});
                    });
                    itemsLikeIt= utils.removeSelf(itemsLikeIt, room);
                    if(itemsLikeIt.length >0) reject({code:msg.TEST_ROOM_EXISTS})
                    else{
                        test.save(function(){resolve({code:msg.TEST_ROOM_UPDATED, content:room._id})})
                    }   
                }
            }
        });
    });
}

/**
 *  Activates / Deactivates an test's room room returning a {code, content} result
 */
function toggle(testId, roomId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var room = test.rooms.id(roomId);
                if(!room) reject({code: msg.TEST_ROOM_NOT_EXIST});
                else{
                    if(room.active){
                        room.active=false;
                        test.save(function(){resolve({code:msg.TEST_ROOM_TOGGLED, content:test._id})})
                    }
                    else{
                        var itemsLikeIt = test.rooms.filter(function(currentItem){
                            return utils.isTheSame(currentItem, {roomId:room.roomId, active:true});
                        });
                        itemsLikeIt = utils.removeSelf(itemsLikeIt, room);
                        if(itemsLikeIt.length >0) reject({code:msg.TEST_ROOM_EXISTS})
                        else{
                            room.active=true;
                            test.save(function(){resolve({code:msg.TEST_ROOM_TOGGLED, content:room._id})})
                        }   
                    }
                }
            }
        });
    });
}

/**
 * Searches for test's rooms returning a {code, content} result that may include the Rooms' list
 */
function list(testId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test) reject({code: msg.TEST_NOT_EXISTS});
            else resolve({code:msg.TEST_ROOMS_FETCH, content:test.rooms});
        });
    })
}

module.exports = {create, get, update, toggle, list}