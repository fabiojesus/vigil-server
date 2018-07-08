const Test = require('../../../DataAccess/Tests/Test');
const TestExaminer = require('../../../DataAccess/Tests/Examiner');
const TestExaminee = require('../../../DataAccess/Tests/Examinee');
const TestRoom = require('../../../DataAccess/Tests/Room');
const Examiner = require('../../../DataAccess/Examiners/Examiner');
const ExaminerTest = require('../../../DataAccess/Examiners/Test');
const Examinee = require('../../../DataAccess/Examinees/Examinee');
const ExamineeTest = require('../../../DataAccess/Examinees/Test');
const Room = require('../../../DataAccess/Rooms/Room');
const RoomTest = require('../../../DataAccess/Rooms/Test');


const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');

function registerTest(token, dateStart, dateEnd, dateLimit, subjectId, type){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                var dateStartDate = new Date(dateStart);
                var dateEndDate = new Date(dateEnd);
                var dateLimitDate = new Date(dateLimit);

                if(dateEndDate.getTime()-dateStartDate.getTime()<0) resolve({code:msg.WRONG_DATE});
                if(dateStartDate.getTime()-dateLimitDate.getTime()<0) resolve({code:msg.WRONG_DATE});
                Subject.get(subjectId).then(function(subject){
                    subject = subject.content;
                    Test.create(utils.getCurrentYear(), dateLimit, dateStart, dateEnd, subjectId, type)
                        .then(function(test){
                            test = test.content;
                            var recordId = subject.records.filter(function(record){return record.year == utils.getCurrentYear()});
                            recordId = recordId[0];
                            SubjectTest.create(subjectId, recordId, test).then(function(){resolve({test})}).catch(function(err){resolve(err)});
                        }).catch(function(res){resolve(res)});
                }).catch(function(res){resolve(res)});
            }
        });
    });
}

function addRoomToTest(token, testId, roomId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            var currentDate = new Date();
            Test.get(testId).then(function(test){
                var limitDate = new Date(test.content.limitDate);
                if(currentDate-limitDate > 0){resolve({code:msg.NO_LONGER_AVAILABLE}); return;}
                TestRoom.create(testId, roomId).then(function(testRoom){
                    Room.get(roomId).then(function(room){
                        room = room.content;
                        var lastRecord = room.records[room.records.length-1];
                        RoomTest.create(roomId, lastRecord._id, testId).then(function(roomTest){
                            resolve(roomTest);
                        }).catch(function(res){resolve(res)});
                    }).catch(function(res){resolve(res)})
                }).catch(function(res){resolve(res)});      
            }).catch(function(res){resolve(res)});
        });
    });
}

function addExaminerToTest(token, testId, examinerId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            var currentDate = new Date();
            Test.get(testId).then(function(test){
                var limitDate = new Date(test.content.limitDate);
                if(currentDate-limitDate > 0){resolve({code:msg.NO_LONGER_AVAILABLE}); return;}
                TestExaminer.create(testId, examinerId).then(function(testExaminer){
                    Examiner.get(examinerId).then(function(examiner){
                        examiner = examiner.content;
                        var lastRecord = examiner.records[examiner.records.length-1];
                        ExaminerTest.create(examinerId, lastRecord._id, testId).then(function(examinerTest){
                            resolve(examinerTest);
                        }).catch(function(res){resolve(res)});
                    }).catch(function(res){resolve(res)})
                }).catch(function(res){resolve(res)});      
            }).catch(function(res){resolve(res)});
        });
    });
}

function addExamineeToTest(token, testId, examineeId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            var currentDate = new Date();
            Test.get(testId).then(function(test){
                var limitDate = new Date(test.content.limitDate);
                if(currentDate-limitDate > 0){resolve({code:msg.NO_LONGER_AVAILABLE}); return;}
                TestExaminee.create(testId, examineeId).then(function(testExaminee){
                    Examinee.get(examineeId).then(function(examinee){
                        examinee = examinee.content;
                        var lastRecord = examinee.records[examinee.records.length-1];
                        ExamineeTest.create(examineeId, lastRecord._id, testId).then(function(examineeTest){
                            resolve(examineeTest);
                        }).catch(function(res){resolve(res)});
                    }).catch(function(res){resolve(res)})
                }).catch(function(res){resolve(res)});      
            }).catch(function(res){resolve(res)});
        });
    });
}

function setExaminerToTestRoom(token, testId, roomId, examinerId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            var currentDate = new Date();
            Test.get(testId).then(function(test){
                test = test.content;
                var limitDate = new Date(test.limitDate);
                if(currentDate-limitDate > 0){resolve({code:msg.NO_LONGER_AVAILABLE}); return;}
                if(!utils.exists(test.rooms, "roomId", roomId)){resolve({code:msg.ROOM_NOT_SET}); return;}
                if(!utils.exists(test.examiners,"examinerId", examinerId)){resolve({code:msg.EXAMINER_NOT_SET}); return;}
                TestExaminer.update(testId, examinerId, null, roomId)
                            .then(function(res){resolve(res)})
                            .catch(function(res){resolve(res)});
            }).catch(function(res){resolve(res)});
        });
    });
}

function setExamineeToTestRoom(token, testId, examineeId, roomId, seat){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            var currentDate = new Date();
            Test.get(testId).then(function(test){
                test = test.content;
                var limitDate = new Date(test.limitDate);
                if(currentDate-limitDate > 0){resolve({code:msg.NO_LONGER_AVAILABLE}); return;}
                if(!utils.exists(test.rooms, "roomId", roomId)){resolve({code:msg.ROOM_NOT_SET}); return;}
                if(!utils.exists(test.examinees, "examineeId", examineeId)){resolve({code:msg.EXAMINEE_NOT_SET}); return;}
                TestExaminee.update(testId, examineeId, null, roomId, seat, null, null, null).then(function(res){resolve(res)}).catch(function(res){resolve(res)});
            });
        });
    });
}

function removeExamineeFromTest(token, testId, examineeId){

}

function removeExaminerFromTest(){

}

function removeRoomFromTest(){
    
}


module.exports = {
    registerTest,
    addRoomToTest,
    addExaminerToTest,
    addExamineeToTest,
    setExaminerToTestRoom,
    setExamineeToTestRoom
}