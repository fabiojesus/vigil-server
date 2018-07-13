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
            TestExaminee.update(testId, examineeId, null, null, null, null, sheetNumber, testId+"."+examinerId+"."+examineeId+"."+sheetNumber+"."+new Date()+"")
                        .then(function(res){resolve(res)}).catch(function(res){resolve(res)});
        });
    });
}

function askQuestion(question){
    return new Promise(function(resolve, reject){
        var answer;
        console.log(question);
        if(question == "what's the meaning of life?") answer = 42;
        if(question == "give me some sweet numbers") answer = "4, 8, 15, 16, 23 ,42";
        if(question == "what doth life?") answer = "What doth life? Are we just fleshy blips in some meaningless stew of cosmic oblivion? Or is it vice-reversa? Is our every trollop through fate's garden infused with a mystic..."
        resolve({code:000, content:answer});
    });
}

module.exports = {confirmPresence, checkIn, askQuestion}