const Test = require('../../../DataAccess/Tests/Test');
const TestExaminee = require('../../../DataAccess/Tests/Examinee');
const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');

function confirmPresence(token, testId, examineeId){
    return new Promise(function(resolve, reject){
        utils.isExaminee(token).then(function(isExaminee){
            if(!isExaminee){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
                var currentDate = new Date();
            Test.get(testId).then(function(test){
                test = test.content;
                var limitDate = new Date(test.limitDate);
                if(currentDate-limitDate > 0){resolve({code:msg.NO_LONGER_AVAILABLE}); return;}
                TestExaminee.update(testId, examineeId, null, null, null, true, null, null).then(function(res){resolve(res)}).catch(function(res){resolve(res)});
            }).catch(function(res){resolve(res)});
        });
    });
}

function checkIn(token, testId, examinerId, examineeId, sheetNumber ){
    return new Promise(function(resolve, reject){
        utils.isExaminer(token).then(function(isExaminer){
            if(!isExaminer){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            TestExaminee.update(testId, examineeId, null, null, null, null, sheetNumber, examinerId+"."+examineeId+"."+sheetNumber+"."+new Date()+"")
                        .then(function(res){resolve(res)}).catch(function(res){resolve(res)});
        });
    });
}

module.exports = {confirmPresence, checkIn}