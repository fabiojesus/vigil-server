const Room = require('../../../DataAccess/Rooms/Room');
const utils = require('../ActionUtils');
const msg = require('../../../Config/messages');

function rooms(token){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            if(!isAdmin){resolve({code:msg.NOT_ENOUGH_PERMISSIONS}); return;}
            Room.list().then(function(res){resolve(res)}).catch(function(res){resolve(res)});
        });
    });
}

function room(token, id){
    return new Promise(function(resolve){
        utils.isAdmin(token).then(function(isAdmin){
            utils.isExaminee(token).then(function(isExaminee){
                utils.isExaminer(token).then(function(isExaminer){
                    Room.get(id).then(function(res){
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

module.exports = {room, rooms}