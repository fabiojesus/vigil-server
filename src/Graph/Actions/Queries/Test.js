const Test = require('../../../DataAccess/Tests/Test');
const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');

function tests(token){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Test.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
        });
    });
}

function test(token, id){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            utils.isExaminee(token).then(function(isExaminee){
                utils.isExaminer(token).then(function(isExaminer){
                    Test.get(id).then(function(test){
                        if(isExaminee){
                            test.content.examiners = [];
                            test.content.examinees = [];
                            test.content.rooms = [];
                        }
                        if(!(isExaminee || isExaminer || isAdmin)){
                            resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;
                        }
                        resolve(test);
                    }).catch(function(res){resolve(res)});
                });
            });
        });
    });
}

module.exports = {test, tests}