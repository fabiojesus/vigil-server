const Test = require('../../Data/Test').Test;
const Examinee = require('../../Data/Test').Examinee;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new examinee examinee for an test returning a {code, content} result
 */
function create(testId, examineeId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var itemsLikeIt = test.examinees.filter(function(currentItem){
                    return utils.isTheSame(currentItem, {examineeId:examineeId, active:true});
                });
                if(itemsLikeIt.length > 0) reject({code:msg.TEST_EXAMINEE_EXISTS});
                else{
                    var newExaminee = new Examinee({examineeId:examineeId, active:true});
                    test.examinees.push(newExaminee);
                    test.save(function(){resolve({code:msg.TEST_EXAMINEE_REGISTER, content:newExaminee._id})});
                }
            }
        });
    });
}

/**
 * Searches for an test's examinee examinee returning a {code, content} result that may contain the examinee
 */
function get(testId, examineeId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var examinee = test.examinees.id(examineeId);
                if(!examinee) reject({code: msg.TEST_EXAMINEE_NOT_EXISTS});
                else resolve({code:msg.TEST_EXAMINEE_FETCH, content:examinee});
            }
        });
    });
}

/**
 *  Updates an test's examinee returning a {code, content} result
 */
function update(testId, examineeId, newExamineeId, roomId, seat, registered, sheetNumber, presence){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var examinee = test.examinees.id(examineeId);
                if(!examinee) reject({code: msg.TEST_EXAMINEE_NOT_EXISTS});
                else{
                    if(newExamineeId) examinee.examineeId = newExamineeId;
                    if(roomId) examinee.roomId = roomId;
                    if(seat) examinee.seat = seat;
                    if(registered) examinee.registered = registered;
                    if(sheetNumber) examinee.sheetNumber = sheetNumber;
                    if(presence) examinee.presence = presence;
                    var itemsLikeIt = test.examinees.filter(function(currentItem){
                        return utils.isTheSame(currentItem, {examineeId:examinee.examineeId, active:true});
                    });
                    itemsLikeIt= utils.removeSelf(itemsLikeIt, examinee);
                    if(itemsLikeIt.length >0) reject({code:msg.TEST_EXAMINEE_EXISTS})
                    else{
                        test.save(function(){resolve({code:msg.TEST_EXAMINEE_UPDATED, content:examinee._id})})
                    }   
                }
            }
        });
    });
}

/**
 *  Activates / Deactivates an test's examinee examinee returning a {code, content} result
 */
function toggle(testId, examineeId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var examinee = test.examinees.id(examineeId);
                if(!examinee) reject({code: msg.TEST_EXAMINEE_NOT_EXIST});
                else{
                    if(examinee.active){
                        examinee.active=false;
                        test.save(function(){resolve({code:msg.TEST_EXAMINEE_TOGGLED, content:test._id})})
                    }
                    else{
                        var itemsLikeIt = test.examinees.filter(function(currentItem){
                            return utils.isTheSame(currentItem, {examineeId:examinee.examineeId, active:true});
                        });
                        itemsLikeIt = utils.removeSelf(itemsLikeIt, examinee);
                        if(itemsLikeIt.length >0) reject({code:msg.TEST_EXAMINEE_EXISTS})
                        else{
                            examinee.active=true;
                            test.save(function(){resolve({code:msg.TEST_EXAMINEE_TOGGLED, content:examinee._id})})
                        }   
                    }
                }
            }
        });
    });
}

function erase(testId, examineeId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var examinee = test.examinee.id(examineeId);
                if(!examinee) reject({code: msg.TEST_EXAMINEE_NOT_EXIST});
                else{
                    examinee.active=false;
                    test.save(function(){resolve({code:msg.TEST_EXAMINEE_DELETED, content:examinee._id})})
                }
            }
        });
    });
}

/**
 * Searches for test's examinees returning a {code, content} result that may include the Examinees' list
 */
function list(testId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test) reject({code: msg.TEST_NOT_EXISTS});
            else resolve({code:msg.TEST_EXAMINEES_FETCH, content:test.examinees});
        });
    })
}

module.exports = {create, get, update, toggle, erase, list}