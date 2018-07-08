const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');
const Examiner = require('../../../DataAccess/Examiners/Examiner');
const ExaminerRecord = require('../../../DataAccess/Examiners/Record');
const Account = require("../../../DataAccess/Accounts/Account");
const roles = require('../../../Config/roles');

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

module.exports = {
    registerExaminer,
    updateExaminer,
    deleteExaminer,
    registerCurrentExaminerRecord,
    deleteExaminerRecord
}