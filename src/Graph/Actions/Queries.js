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
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Subject.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
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
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Room.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
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
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Examinee.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
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
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Examiner.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
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
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Test.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
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
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Room.get(id).then(function(res){resolve(res)}).catch(function(res){resolve(res)});
        });
    });
}

function roomNotAdmin(token, id){
    return new Promise(function(resolve){
        utils.isExaminer(token).then(function(isExaminer){
            utils.isExaminee(token).then(function(isExaminer){
                if(!(isExaminer || isExaminee)){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
                Room.get(id).then(function(res){res.content.records=null;resolve(res)}).catch(function(res){resolve(res)});
            });
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
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            subject.get(id).then(function(res){resolve(res)}).catch(function(res){resolve(res)});
        });
    });
}

/**
 * Lists a examiner with all the records and tests for a administrator or an examiner
 * @param {string} token 
 * @param {string} id
 */
function examiner(token, id){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            utils.isExaminer(token).then(function(isExaminer){
                if(!(isAdmin || isExaminer)){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
                Examiner.get(id).then(function(res){resolve(res)}).catch(function(res){resolve(res)});
            });
        });
    });
}

/**
 * Lists a examinee with all the records and tests for an administrator or an examinee
 * @param {string} token 
 * @param {string} id
 */
function examinee(token, id){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            utils.isExaminee(token).then(function(isExaminee){
                if(!(isAdmin || isExaminee)){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
                Examinee.get(id).then(function(res){resolve(res)}).catch(function(res){resolve(res)});
            });
        });
    });
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
    roomNotAdmin,
    examinee,
    examiner,
    test
}