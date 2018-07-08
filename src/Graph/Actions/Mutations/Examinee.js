const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');
const Examinee = require('../../../DataAccess/Examinees/Examinee');
const ExamineeRecord = require('../../../DataAccess/Examinees/Record');
const Account = require("../../../DataAccess/Accounts/Account");
const roles = require('../../../Config/roles');

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


module.exports = {
    registerExaminee,
    updateExaminee,
    deleteExaminee,
    registerCurrentExamineeRecord,
    renewExamineeRecord,
    updateExamineeRecord,
    deleteExamineeRecord
}