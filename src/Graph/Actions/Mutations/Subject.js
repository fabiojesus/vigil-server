const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');
const Subject = require('../../../DataAccess/Subjects/Subject');
const SubjectRecord = require('../../../DataAccess/Subjects/Record');

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

function updateSubject(token, examinerId, name, field){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Subject.update(examinerId, name, field).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
        });
    });
}

function deleteSubject(token, subjectId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Subject.erase(subjectId).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
        });
    });
}

function registerSubjectRecord(token, subjectId, year){
    return new Promise(function(resolve, reject){
        if(!utils.isAdmin(token)) {resolve({code:NOT_ENOUGH_PERMISSIONS}); return;}
        SubjectRecord.create(subjectId, year).then(function(res){resolve(res);}).catch(function(res){resolve(res);});
    });
}

function registerCurrentSubjectRecord(token, subjectId){
    return registerSubjectRecord(token, subjectId, utils.getCurrentYear());
}

function deleteSubjectRecord(token, id, recordId){
    return new Promise(function(resolve, reject){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            SubjectRecord.erase(id, recordId).then(function(res){resolve(res);}).catch(function(res){resolve(res)})
        });
    });
}

module.exports = {
    registerSubject,
    updateSubject,
    deleteSubject,
    registerCurrentSubjectRecord,
    deleteSubjectRecord
}