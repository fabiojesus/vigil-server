const Examiner = require('../../../DataAccess/Examiners/Examiner');
const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');

function examiners(token){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Examiner.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
        });
    });
}

function examiner(token, id){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            utils.isExaminee(token).then(function(isExaminee){
                utils.isExaminer(token).then(function(isExaminer){
                    Examiner.get(id).then(function(res){
                        if(isExaminee || isExaminer)
                            res.content.records = [];
                        if(!(isExaminee || isExaminer || isAdmin)){
                            resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;
                        }
                        resolve(res);
                    }).catch(function(res){resolve(res)});
                });
            });
        });
    });
}

module.exports = {examiner, examiners}