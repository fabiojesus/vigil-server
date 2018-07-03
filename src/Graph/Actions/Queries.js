const Examinee = require('../../DataAccess/Examinees/Examinee');
const Examiner = require('../../DataAccess/Examiners/Examiner');
const Room = require('../../DataAccess/Rooms/Room');
const Subject = require("../../DataAccess/Subjects/Subject");
const Test = require('../../DataAccess/Tests/Test');
const utils = require('./ActionUtils');
const msg = require('../../Config/messages');

/**
 * Lists all subjects for a administrator
 * @param {string} token 
 */
function subjects(token){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                Subject.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
            }
        });
    });
}

/**
 * Lists all rooms for a administrator
 * @param {string} token 
 */
function rooms(token){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            console.log(isAdmin);
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                Room.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
            }
        });
    });
}

/**
 * Lists all examinees for a administrator
 * @param {string} token 
 */
function examinees(token){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                Examinee.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
            }
        });
    });
}

/**
 * Lists all examiners for a administrator
 * @param {string} token 
 */
function examiners(token){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                Examiners.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
            }
        });
    });
}

/**
 * Lists all tests for a administrator
 * @param {string} token 
 */
function tests(token){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                Test.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
            }
        });
    });
}

/**
 * Lists a room with all the records and tests for a administrator
 * @param {string} token 
 * @param {string} id
 */
function room(token, id){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin)resolve({code:msg.NOT_ENOUGH_PERMISSIONS});
            else{
                Room.get(id).then(function(res){resolve(res)}).catch(function(res){resolve(res)});
                /*
                Test.list().then(function(tests){
                    tests = tests.content;
                    Subject.list().then(function(subjects){
                        subjects = subjects.content;
                        Room.get(id).then(function(room){
                            room = room.content;
                            var roomData = {name:room.name, seats:room.seats, active:room.active, records:[]};
                            room.records.forEach(function(record){
                                var recordData = {year:record.year, active:record.active, tests:[]};
                                record.tests.forEach(function(recordTest){
                                    var test = tests.filter(function(test){return test._id==recordTest.testId});
                                    if(test.length>0){
                                        test = test[0];
                                        var subject = subjects.filter(function(subject){return subject._id == test.subjectId});
                                        if(subject.length>0){
                                            subject = subject[0];
                                            recordData.tests.push({
                                                confirmationData:test.confirmationData,
                                                dateStart:test.dateStart,
                                                dateEnd:test.dateEnd,
                                                subjectName: subject.name,
                                                subjectField:subject.field,
                                                type:test.type,
                                                active:test.active
                                            });
                                        }
                                    }
                                });
                                roomData.records.push(recordData);
                            });
                            resolve({code:msg.ROOM_FETCH, content:JSON.stringify(roomData)});
                        }).catch(function(res){resolve(res)});
                    }).catch(function(res){esolve(res)});
                }).catch(function(res){resolve(res)});*/
            }
        });
    });
}

/**
 * Lists a subject with all the records and tests for a administrator
 * @param {string} token 
 * @param {string} id
 */
function subject(token, id){
    return new Promise(function(resolve){
        if(!utils.isAdmin(token)) resolve({code:NOT_ENOUGH_PERMISSIONS});
        Test.list().then(function(tests){
            tests = tests.content;
            Subject.get(id).then(function(subject){
                subject = subject.content;
                var subjectData = {name:subject.name, field:subject.field, active:subject.active, records:[]};
                subject.records.forEach(function(record){
                    var recordData = {year:record.year, active:record.active, tests:[]};
                    record.tests.forEach(function(recordTest){
                        var test = tests.filter(function(test){console.log(test._id); console.log(recordTest.testId);return test._id == recordTest.testId});
                        if(test.length>0){
                            test = test[0];
                            recordData.tests.push({
                                confirmationData:test.confirmationData,
                                dateStart:test.dateStart,
                                dateEnd:test.dateEnd,
                                type:test.type,
                                active:test.active
                            });
                        }
                    });
                    subjectData.records.push(recordData);
                });
                resolve({code:msg.SUBJECT_FETCH, content:JSON.stringify(subjectData)});
            }).catch(function(res){resolve(res)});
        }).catch(function(res){resolve(res)});
    });
}

/**
 * Lists a examiner with all the records and tests for a administrator or an examiner
 * @param {string} token 
 * @param {string} id
 */
function examiner(token, id){
    return "TODO";
}

/**
 * Lists a examinee with all the records and tests for an administrator or an examinee
 * @param {string} token 
 * @param {string} id
 */
function examinee(token, id){
    return "TODO";
}

/**
 * Lists a tests with all the records and tests for an administrator or an examiner
 * @param {*} token 
 * @param {*} id 
 */
function test(token, id){
    return "TODO";
}


module.exports = {
    subjects,
    rooms,
    examinees,
    examiners,
    tests,
    subject,
    room,
    examinee,
    examiner,
    test
}