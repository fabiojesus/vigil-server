const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');
const Examinee = require('../../../DataAccess/Examinees/Examinee');
const ExamineeRecord = require('../../../DataAccess/Examinees/Record');
const Account = require("../../../DataAccess/Accounts/Account");
const roles = require('../../../Config/roles');
const Subject = require('../../../DataAccess/Subjects/Subject');
const Room = require('../../../DataAccess/Rooms/Room');
const Test = require('../../../DataAccess/Tests/Test');


function registerExaminee(token, name, identification, email, course, studentNumber){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                Examinee.create(identification, name).then(function(examinee){
                    if(examinee.content){
                        registerCurrentExamineeRecord(token, examinee.content, course, studentNumber).then(function(record){
                            if(!record.code == msg.EXAMINEE_RECORD_REGISTER) {resolve(record); return;}
                            var newPassword = utils.generateRandomPassword();
                            Account.create(email, newPassword , examinee.content, roles.EXAMINEE).then(function(account){
                                if(account.code == msg.ACCOUNT_REGISTER){
                                    utils.sendNewAccountEmail(email,newPassword);
                                    resolve(examinee);
                                }                
                            }).catch(function(err){resolve(err)});
                        });
                    }
                }).catch(function(err){resolve(err)});
            }
        });
    });
}

function updateExaminee(token, examineeId, identification, name){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Examinee.update(examineeId, identification, name).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
        });
    });
}

function deleteExaminee(token, examineeId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Examinee.erase(examineeId).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
        });
    });
}

function registerExamineeRecord(token, examinerId, year, course, studentNumber){
    console.log(course);
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            ExamineeRecord.create(examinerId, year, course, studentNumber).then(function(res){resolve(res);}).catch(function(res){resolve(res);});
        });
    });
}

function registerCurrentExamineeRecord(token, examineeId, course, studentNumber){
    return registerExamineeRecord(token, examineeId, utils.getCurrentYear(), course, studentNumber);
}

function renewExamineeRecord(token, examineeId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Examinee.get(examineeId).then(function(examinee){
                if(!examinee.content){resolve(examinee);return;}
                examinee = examinee.content;
                var lastRecord = examinee.records[examinee.records.length-1];
                registerCurrentExamineeRecord(token, examineeId, lastRecord.course, lastRecord.studentNumber).then(function(res){resolve(res)})
            }).catch(function(res){resolve(res)});
        });
    });
}

function updateExamineeRecord(token, examineeId, recordId, course, studentNumber){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            ExamineeRecord.update(examineeId, recordId, null, course, studentNumber).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
        });
    });
}

function deleteExamineeRecord(token, examineeId, examineeRecordId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            ExamineeRecord.erase(examineeId, examineeRecordId).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
        });
    });
}

function getFull(id){
    return new Promise(function(resolve, reject){
        Subject.list().catch(res => reject(res)).then(function(subjects){
            subjects = subjects.content;
            Test.list().catch(res => reject(res)).then(function(tests){
                tests = tests.content;
                Room.list().catch(res => reject(res)).then(function(rooms){
                    rooms = rooms.content;
                    Examinee.get(id).catch(res => reject(res)).then(function(examinee){
                        examinee = examinee.content;
                        for(var i = 0; i< examinee.records.length; i++){
                            for(var j = 0; j< examinee.records[i].tests.length; j++){
                                let testData = tests.filter(function(temp){return examinee.records[i].tests[j].testId == temp._id})[0];
                                let testDataExaminee = null;
                                testData.examinees.forEach(function(examineeData){
                                    if(examineeData.examineeId == id){
                                        testDataExaminee = examineeData;
                                    }
                                });
                                var subject = subjects.filter(function(temp){return testData.subjectId == temp._id}); 
                                examinee.records[i].tests[j] = {
                                    confirmationDate:testData.confirmationDate,
                                    dateStart: testData.dateStart,
                                    dateEnd: testData.dateEnd,
                                    subject: subject[0].name,
                                    type: testData.type,
                                    isDeleted: testData.isDeleted,
                                    room:testDataExaminee.room,
                                    seat:testDataExaminee.seat,
                                    sheetNumber:testDataExaminee.sheetNumber
                                };
                            }
                        }
                    resolve({code:3, content:JSON.stringify(examinee)});
                    });
                });
            });
        });
    });
}

module.exports = {
    registerExaminee,
    updateExaminee,
    deleteExaminee,
    getFull,
    registerCurrentExamineeRecord,
    renewExamineeRecord,
    updateExamineeRecord,
    deleteExamineeRecord
}