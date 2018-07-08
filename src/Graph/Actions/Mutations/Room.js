const Room = require('../../../DataAccess/Rooms/Room');
const RoomRecord = require('../../../DataAccess/Rooms/Record');
const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');

function registerRoom(token, name, seats){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                Room.create(name, seats).then(function(room){
                    if(room.code == msg.ROOM_REGISTER){
                        registerCurrentRoomRecord(token, room.content).then(function(record){
                            if(record.code == msg.ROOM_RECORD_REGISTER) resolve(room);
                        });
                    }
                }).catch(function(res){resolve(res);});
            }
        });
    });
}

function updateRoom(token, examinerId, name, seats){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Room.update(examinerId, name, seats).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
        });
    });
}

function deleteRoom(token, roomId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Room.erase(roomId).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
        });
    });
}

function registerRoomRecord(token, roomId, year){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            RoomRecord.create(roomId, year).then(function(res){resolve(res);}).catch(function(res){resolve(res);});
        });
    });
}

function registerCurrentRoomRecord(token, roomId){
    return registerRoomRecord(token, roomId, utils.getCurrentYear());
}

function deleteRoomRecord(token, roomId, roomRecordId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            RoomRecord.erase(roomId, roomRecordId).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
        });
    });
}

module.exports = {
    registerRoom,
    updateRoom,
    deleteRoom,
    registerCurrentRoomRecord,
    deleteRoomRecord
}