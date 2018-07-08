const Room = require('../../Data/Room').Room;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new Room record returning a {code, content} result
 */
function create(name, seats){
    return new Promise(function(resolve, reject){
        Room.find({name:name, isDeleted:false}).then(function(rooms){
            if(rooms.length>0) {reject({code:msg.ROOM_EXISTS}); return;}
            var room = new Room({name:name, seats:seats, isDeleted:false});
            room.save(function(){resolve({code:msg.ROOM_REGISTER, content:room._id})});
        });
    });
}

/**
 * Searches for an Room record returning a {code, content} result that may contain the record
 */
function get(id){
    return new Promise(function(resolve, reject){
        Room.findById(id).then(function(room){
            if(!room) {reject({code:msg.ROOM_NOT_EXISTS}); return;}
            resolve({code:msg.ROOM_FETCH, content:room});
        });
    });
}

/**
 *  Updates an existing Room Record returning a {code, content} result
 */
function update(id, name, seats){
    return new Promise(function(resolve, reject){
        Room.findById(id).then(function(room){
            if(!room) {reject({code:msg.ROOM_NOT_EXISTS}); return;}
            if(name) room.name = name;
            if(seats) room.seats = seats;
            Room.find({name:room.name, isDeleted:false, _id: {$ne: room._id}}).then(function(rooms){
                if(rooms.length>0) {reject({code:msg.ROOM_EXISTS}); return;}
                room.save(function(){resolve({code:msg.ROOM_UPDATED, content:room._id})});    
            });
        });
    });
}


function erase(id){
    return new Promise(function(resolve, reject){
        Room.findById(id).then(function(room){
            if(!room) {reject({code:msg.ROOM_NOT_EXISTS}); return;}
            if(!utils.isEmpty(room.records)){reject({code:msg.ROOM_HAS_RECORDS}); return;}
            room.isDeleted = true;
            room.save(function(){resolve({code:msg.ROOM_DELETED, content:room._id})})
        }).catch(function(res){reject(res)})
    });
}

/**
 * Searches for all Room Records returning a {code, content} result that may include the rooms' list
 */
function list(){
    return new Promise(function(resolve, reject){
        Room.find({}).then(function(result){resolve({code: msg.ROOMS_FETCH, content:result});})
    });
}

module.exports = {create, get, update, erase, list};