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

function getFull(token, id){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            utils.isExaminee(token).then(function(isExaminee){
                utils.isExaminer(token).then(function(isExaminer){
                    if(!isAdmin && !isExaminee && !isExaminer){reject({code: msg.NOT_ENOUGH_PERMISSIONS}); return;}
                    Subject.list().catch(res => reject(res)).then(function(subjects){
                        subjects = subjects.content;
                        Test.list().catch(res => reject(res)).then(function(tests){
                            tests = tests.content;
                            Room.get(id).catch(res => reject(res)).then(function(room){
                                room = room.content;
                                for(var i = 0; i< room.records.length; i++){
                                    for(var j = 0; j< room.records[i].tests.length; j++){
                                        let testData = tests.filter(function(temp){return room.records[i].tests[j].testId == temp._id})[0];
                                        var subject = subjects.filter(function(temp){return testData.subjectId == temp._id}); 
                                        room.records[i].tests[j] = {
                                            confirmationDate:testData.confirmationDate,
                                            dateStart: testData.dateStart,
                                            dateEnd: testData.dateEnd,
                                            subject: subject[0].name,
                                            type: testData.type,
                                            isDeleted: testData.isDeleted,
                                        };
                                    }
                                }
                            resolve({code:msg.EXAMINER_FETCH, content:JSON.stringify(examiner)});
                            });
                        });
                    });
                });
            });
        });
    });
}

module.exports = {
    registerRoom,
    updateRoom,
    deleteRoom,
    getFull,
    registerCurrentRoomRecord,
    deleteRoomRecord
}