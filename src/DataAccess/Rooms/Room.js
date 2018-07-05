const Room = require('../../Data/Room').Room;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new Room record returning a {code, content} result
 */
function create(name, seats){
    return new Promise(function(resolve, reject){
        Room.find({name:name, active:true}).then(function(rooms){
            if(rooms.length>0) reject({code:msg.ROOM_EXISTS});
            else{
                var room = new Room({name:name, seats:seats, active:true});
                room.save(function(){resolve({code:msg.ROOM_REGISTER, content:room._id})});
            }
        });
    });
}

/**
 * Searches for an Room record returning a {code, content} result that may contain the record
 */
function get(id){
    return new Promise(function(resolve, reject){
        Room.findById(id).then(function(room){
            if(!room) reject({code:msg.ROOM_NOT_EXISTS});
            else resolve({code:msg.ROOM_FETCH, content:room});
        });
    });
}

/**
 *  Updates an existing Room Record returning a {code, content} result
 */
function update(id, name, seats){
    return new Promise(function(resolve, reject){
        Room.findById(id).then(function(room){
            if(!room) reject({code:msg.ROOM_NOT_EXISTS})
            else{
                if(name) room.name = name;
                if(seats) room.seats = seats;
                Room.find({name:room.name, active:true, _id: {$ne: room._id}}).then(function(rooms){
                    if(rooms.length>0) reject({code:msg.ROOM_EXISTS})
                    else{
                        room.save(function(){resolve({code:msg.ROOM_UPDATED, content:room._id})});    
                    }
                });
            }
        });
    });
}

/**
 *  Activates / Deactivates an existing Room Record returning a {code, content} result
 */
function toggle(id){
    return new Promise(function(resolve, reject){
        Room.findById(id).then(function(room){
            if(!room) reject({code:msg.ROOM_NOT_EXISTS})
            else{
                if(room.active){
                    room.active = false;
                    room.save(function(){resolve({code:msg.ROOM_TOGGLED, content:room._id})})
                }
                else{
                    Room.find({name:room.name, active:true, _id: {$ne: room._id}}).then(function(rooms){
                        if(rooms.length>0) reject({code:msg.ROOM_EXISTS})
                        else{
                            room.active = true;
                            room.save(function(){resolve({code:msg.ROOM_TOGGLED, content:room._id})});    
                        }
                    });
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
                room.active = false;
                room.save(function(){resolve({code:msg.ROOM_DELETED, content:room._id})})
            }
        }).catch(function(res){reject(res)})
    });
}

/**
 * Searches for all Room Records returning a {code, content} result that may include the rooms' list
 */
function list(){
    return new Promise(function(resolve, reject){
        Room.find({}).then(function(result){
            resolve({code: msg.ROOMS_FETCH, content:result});
        })
    });
}

module.exports = {create, get, update, toggle, erase, list};