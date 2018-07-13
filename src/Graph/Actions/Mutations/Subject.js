const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');
const Subject = require('../../../DataAccess/Subjects/Subject');
const SubjectRecord = require('../../../DataAccess/Subjects/Record');
const Test = require('../../../DataAccess/Tests/Test');

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
                            Subject.get(id).catch(res => reject(res)).then(function(subject){
                                subject = subject.content;
                                for(var i = 0; i< subject.records.length; i++){
                                    for(var j = 0; j< subject.records[i].tests.length; j++){
                                        let testData = tests.filter(function(temp){return subject.records[i].tests[j].testId == temp._id})[0];
                                        subject.records[i].tests[j] = {
                                            confirmationDate:testData.confirmationDate,
                                            dateStart: testData.dateStart,
                                            dateEnd: testData.dateEnd,
                                            type: testData.type,
                                            isDeleted: testData.isDeleted,
                                        };
                                    }
                                }
                                console.log(subject);
                            resolve({code:msg.EXAMINER_FETCH, content:JSON.stringify(subject)});
                            });
                        });
                    });
                });
            });
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
    deleteSubjectRecord,
    getFull
}