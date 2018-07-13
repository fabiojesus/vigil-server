const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');
const Examiner = require('../../../DataAccess/Examiners/Examiner');
const ExaminerRecord = require('../../../DataAccess/Examiners/Record');
const Account = require("../../../DataAccess/Accounts/Account");
const roles = require('../../../Config/roles');
const Subject = require('../../../DataAccess/Subjects/Subject');
const Room = require('../../../DataAccess/Rooms/Room');
const Test = require('../../../DataAccess/Tests/Test');

function registerExaminer(token, name, identification, email){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Examiner.create(identification, name).then(function(examiner){
                if(examiner.content){
                    registerCurrentExaminerRecord(token, examiner.content).then(function(record){
                        if(!record.code == msg.EXAMINER_RECORD_REGISTER) resolve(record);
                        var newPassword = utils.generateRandomPassword();
                        Account.create(email, newPassword , examiner.content, roles.EXAMINER).then(function(account){
                            if(account.code == msg.ACCOUNT_REGISTER){
                                utils.sendNewAccountEmail(email,newPassword);
                                resolve(examiner);
                            }                
                        }).catch(function(err){resolve(err)});
                    }).catch(function(res){resolve(res);});
                }
            }).catch(function(err){resolve(err)});
        });
    });
}

function updateExaminer(token, examinerId, identification, name){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Examiner.update(examinerId, identification, name).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
        });
    });
}

function deleteExaminer(token, examinerId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Examiner.erase(examinerId).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
        });
    });
}

function registerExaminerRecord(token, examinerId, year){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            ExaminerRecord.create(examinerId, year).then(function(res){resolve(res);}).catch(function(res){resolve(res);});
        });
    });
}

function registerCurrentExaminerRecord(token, examinerId){
    return registerExaminerRecord(token, examinerId, utils.getCurrentYear());
}

function deleteExaminerRecord(token, examinerId, examinerRecordId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            ExaminerRecord.erase(examinerId, examinerRecordId).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
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
                            Room.list().catch(res => reject(res)).then(function(rooms){
                                rooms = rooms.content;
                                Examiner.get(id).catch(res => reject(res)).then(function(examiner){
                                    examiner = examiner.content;
                                    for(var i = 0; i< examiner.records.length; i++){
                                        for(var j = 0; j< examiner.records[i].tests.length; j++){
                                            let testData = tests.filter(function(temp){return examiner.records[i].tests[j].testId == temp._id})[0];
                                            let testDataExaminer = null;
                                            testData.examiners.forEach(function(examinerData){
                                                if(examinerData.examinerId == id){
                                                    testDataExaminer = examinerData;
                                                }
                                            });
                                            var subject = subjects.filter(function(temp){return testData.subjectId == temp._id}); 
                                            examiner.records[i].tests[j] = {
                                                confirmationDate:testData.confirmationDate,
                                                dateStart: testData.dateStart,
                                                dateEnd: testData.dateEnd,
                                                subject: subject[0].name,
                                                type: testData.type,
                                                isDeleted: testData.isDeleted,
                                                room:testDataExaminer.room,
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
    });
}

module.exports = {
    registerExaminer,
    updateExaminer,
    deleteExaminer,
    registerCurrentExaminerRecord,
    getFull,
    deleteExaminerRecord
}