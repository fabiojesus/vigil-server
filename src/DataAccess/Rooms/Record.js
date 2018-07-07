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
            if(!room){reject({code:msg.ROOM_NOT_EXISTS});return;}
            var itemsLikeIt = room.records.filter(function(currentItem){return utils.isTheSame(currentItem, {year:year, isDeleted:false});});
            if(itemsLikeIt.length > 0) {reject({code:msg.ROOM_RECORD_EXISTS}); return;}
            var newRecord = new Record({year, isDeleted:false});
            room.records.push(newRecord);
            room.save(function(){resolve({code:msg.ROOM_RECORD_REGISTER, content:newRecord._id})});
        });
    });
}

/**
 * Searches for an room's record record returning a {code, content} result that may contain the record
 */
function get(roomId, recordId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room){reject({code:msg.ROOM_NOT_EXISTS}); return;}
            var record = room.records.id(recordId);
            if(!record) {reject({code: msg.ROOM_RECORD_NOT_EXIST}); return;}
            resolve({code:msg.ROOM_RECORD_FETCH, content:record});
        });
    });
}

/**
 *  Updates an room's record returning a {code, content} result
 */
function update(roomId, recordId, year){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room){reject({code:msg.ROOM_NOT_EXISTS}); return;}
            var record = room.records.id(recordId);
            if(!record) {reject({code: msg.ROOM_RECORD_NOT_EXIST}); return;}
            if(year) record.year = year;
            var itemsLikeIt = room.records.filter(function(currentItem){return utils.isTheSame(currentItem, {year:record.year, isDeleted:false});});
            itemsLikeIt= utils.removeSelf(itemsLikeIt, record);
            if(itemsLikeIt.length >0) {reject({code:msg.ROOM_RECORD_EXISTS}); return;}
            room.save(function(){resolve({code:msg.ROOM_RECORD_UPDATED, content:record._id})})
        });
    });
}

function erase(id){
    return new Promise(function(resolve, reject){
        Room.findById(id).then(function(room){
            if(!room) {reject({code:msg.ROOM_NOT_EXISTS}); return;}
            var record = room.records.id(recordId);
            if(!record) {reject({code: msg.ROOM_RECORD_NOT_EXIST}); return;}
            if(!isEmpty(record.tests)){reject({code:msg.ROOM_RECORD_HAS_TESTS}); return;}
            record.isDeleted = true;
            room.save(function(){resolve({code:msg.ROOM_RECORD_DELETED, content:record._id})})
        }).catch(function(res){reject(res)})
    });
}

/**
 * Searches for room's records returning a {code, content} result that may include the Records' list
 */
function list(roomId){
    return new Promise(function(resolve, reject){
        Room.findById(roomId).then(function(room){
            if(!room) {reject({code: msg.ROOM_NOT_EXISTS}); return;}
            resolve({code:msg.ROOM_RECORDS_FETCH, content:room.records});
        });
    })
}

module.exports = {create, get, update, erase, list}