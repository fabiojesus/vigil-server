const Account = require('../../DataAccess/Accounts/Account');
const Examinee = require('../../DataAccess/Examinees/Examinee');
const ExamineeRecord = require('../../DataAccess/Examinees/Record');
const Examiner = require('../../DataAccess/Examiners/Examiner');
const ExaminerRecord = require('../../DataAccess/Examiners/Record');
const msg = require('../../Config/messages');
const Room = require('../../DataAccess/Rooms/Room');
const RoomRecord = require('../../DataAccess/Rooms/Record')
const Subject = require("../../DataAccess/Subjects/Subject");
const SubjectRecord = require("../../DataAccess/Subjects/Record");
const SubjectTest = require('../../DataAccess/Subjects/Test');
const Test = require('../../DataAccess/Tests/Test');
const Token = require('../../DataAccess/Accounts/Token');
const utils = require('./ActionUtils');

/**
 * logins the user, checking if the input data is correct and if the user is logged in already
 * @param {string} email 
 * @param {string} password 
 */
function login(email, password){
    return new Promise(function(resolve, reject){
        utils.validateAccount(email, password).then(function(res){resolve(res)});
    });
}

function logout(token){
    return new Promise(function(resolve, reject){
        Token.erase(token).then(resolve({code:msg.LOGOUT_SUCCESSFUL})).catch(function(err){resolve(err)});
    });
}


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

function registerSubject(token, name, field){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                Subject.create(name, field).then(function(subject){
                    if(subject.code == msg.SUBJECT_REGISTER){
                        registerCurrentSubjectRecord(token, subject.content).then(function(record){
                                if(record.code == msg.SUBJECT_RECORD_REGISTER) resolve(subject);
                        }).catch(function(res){resolve(res);});
                    }
                }).catch(function(res){resolve(res);});
            }
        });
    });
}

function registerExaminee(name, identification, email){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                Examinee.create(identification, name).then(function(examinee){
                    if(examinee.content){
                        var newPassword = utils.generateRandomPassword();
                        Account.create(email, newPassword , examinee.content, "examinee").then(function(account){
                            if(account.code == msg.ACCOUNT_REGISTER){
                                utils.sendNewAccountEmail(email,newPassword);
                                resolve({code:msg.EXAMINEE_REGISTER});
                            }                
                        }).catch(function(err){resolve(err)});
                    }
                }).catch(function(err){resolve(err)});
            }
        });
    });
}

function registerExaminer(name, identification, email){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                Examiner.create(identification, name).then(function(examinee){
                    if(examinee.Id){
                        var newPassword = utils.generateRandomPassword();
                        Account.create(email, newPassword , examineeId, "examinee").then(function(account){
                            if(account.code == msg.ACCOUNT_REGISTER){
                                utils.sendNewAccountEmail(email,newPassword);

                                resolve({code:msg.EXAMINEE_REGISTER});
                            }                
                        }).catch(function(err){resolve(err)});
                    }
                }).catch(function(err){resolve(err)});
            }
        });
    });
}

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
                            SubjectTest.create(subjectId, recordId, test).then(function(recordTest){resolve(recordTest)}).catch(function(err){resolve(err)});
                        }).catch(function(res){resolve(res)});
                }).catch(function(res){resolve(res)});
            }
        });
    });
}

function registerRoomRecord(token, roomId, year){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                 RoomRecord.create(roomId, year).then(function(res){resolve(res);}).catch(function(res){resolve(res);});
            }
        });
    });
}

function registerCurrentRoomRecord(token, roomId){
    return registerRoomRecord(token, roomId, utils.getCurrentYear());
}

function registerSubjectRecord(token, subjectId, year){
    return new Promise(function(resolve, reject){
        if(!utils.isAdmin(token)) resolve({code:NOT_ENOUGH_PERMISSIONS});
        else{
            SubjectRecord.create(subjectId, year).then(function(res){resolve(res);}).catch(function(res){resolve(res);});
        }   
    });
}

function registerCurrentSubjectRecord(token, subjectId){
    return registerSubjectRecord(token, subjectId, utils.getCurrentYear());
}

module.exports = {
    login,
    logout,
    registerRoom,
    registerSubject,
    registerExaminee,
    registerExaminer,
    registerTest,
    registerCurrentRoomRecord,
    registerCurrentSubjectRecord,

}