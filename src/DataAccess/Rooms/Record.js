const Room = require('../../Data/Room').Room;
const Record = require('../../Data/Room').Record;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new record record for an room returning a {code, content} result
 */
function create(roomId, year){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room)reject({code:msg.ROOM_NOT_EXISTS});
            else{
                var itemsLikeIt = room.records.filter(function(currentItem){
                    return utils.isTheSame(currentItem, {year:year, active:true});
                });
                if(itemsLikeIt.length > 0) reject({code:msg.ROOM_RECORD_EXISTS});
                else{
                    var newRecord = new Record({year, active:true});
                    room.records.push(newRecord);
                    room.save(function(){resolve({code:msg.ROOM_RECORD_REGISTER, content:newRecord._id})});
                }
            }
        });
    });
}

/**
 * Searches for an room's record record returning a {code, content} result that may contain the record
 */
function get(roomId, recordId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room)reject({code:msg.ROOM_NOT_EXISTS});
            else{
                var record = room.records.id(recordId);
                if(!record) reject({code: msg.ROOM_RECORD_NOT_EXIST});
                else resolve({code:msg.ROOM_RECORD_FETCH, content:record});
            }
        });
    });
}

/**
 *  Updates an room's record returning a {code, content} result
 */
function update(roomId, recordId, year){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room)reject({code:msg.ROOM_NOT_EXISTS});
            else{
                var record = room.records.id(recordId);
                if(!record) reject({code: msg.ROOM_RECORD_NOT_EXIST});
                else{
                    if(year) record.year = year;
                    var itemsLikeIt = room.records.filter(function(currentItem){
                        return utils.isTheSame(currentItem, {year:record.year, active:true});
                    });
                    itemsLikeIt= utils.removeSelf(itemsLikeIt, record);
                    if(itemsLikeIt.length >0) reject({code:msg.ROOM_RECORD_EXISTS})
                    else{
                        room.save(function(){resolve({code:msg.ROOM_RECORD_UPDATED, content:record._id})})
                    }   
                }
            }
        });
    });
}

/**
 *  Activates / Deactivates an room's record record returning a {code, content} result
 */
function toggle(roomId, recordId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room)reject({code:msg.ROOM_NOT_EXISTS});
            else{
                var record = room.records.id(recordId);
                if(!record) reject({code: msg.ROOM_RECORD_NOT_EXIST});
                else{
                    if(record.active){
                        record.active=false;
                        room.save(function(){resolve({code:msg.ROOM_RECORD_TOGGLED, content:room._id})})
                    }
                    else{
                        var itemsLikeIt = room.records.filter(function(currentItem){
                            return utils.isTheSame(currentItem, {year:record.year, active:true});
                        });
                        itemsLikeIt = utils.removeSelf(itemsLikeIt, record);
                        if(itemsLikeIt.length >0) reject({code:msg.ROOM_RECORD_EXISTS})
                        else{
                            record.active=true;
                            room.save(function(){resolve({code:msg.ROOM_RECORD_TOGGLED, content:record._id})})
                        }   
                    }
                }
            }
        });
    });
}

function erase(id){
    return new Promise(function(resolve, reject){
        Room.findById(id).then(function(room){
            if(!room) reject({code:msg.ROOM_NOT_EXISTS})
            else{
                var record = room.records.id(recordId);
                if(!record) reject({code: msg.ROOM_RECORD_NOT_EXIST});
                else{
                    record.active = false;
                    room.save(function(){resolve({code:msg.ROOM_RECORD_DELETED, content:record._id})})
                }
            }
        }).catch(function(res){reject(res)})
    });
}

/**
 * Searches for room's records returning a {code, content} result that may include the Records' list
 */
function list(roomId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room) reject({code: msg.ROOM_NOT_EXISTS});
            else resolve({code:msg.ROOM_RECORDS_FETCH, content:room.records});
        });
    })
}

module.exports = {create, get, update, toggle, erase, list}