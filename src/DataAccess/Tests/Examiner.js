const Test = require('../../Data/Test').Test;
const Examiner = require('../../Data/Test').Examiner;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new examiner examiner for an test returning a {code, content} result
 */
function create(testId, examinerId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var itemsLikeIt = test.examiners.filter(function(currentItem){
                    return utils.isTheSame(currentItem, {examinerId:examinerId, active:true});
                });
                if(itemsLikeIt.length > 0) reject({code:msg.TEST_EXAMINER_EXISTS});
                else{
                    var newExaminer = new Examiner({examinerId:examinerId, active:true});
                    test.examiners.push(newExaminer);
                    test.save(function(){resolve({code:msg.TEST_EXAMINER_REGISTER, content:newExaminer._id})});
                }
            }
        });
    });
}

/**
 * Searches for an test's examiner examiner returning a {code, content} result that may contain the examiner
 */
function get(testId, examinerId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var examiner = test.examiners.id(examinerId);
                if(!examiner) reject({code: msg.TEST_EXAMINER_NOT_EXISTS});
                else resolve({code:msg.TEST_EXAMINER_FETCH, content:examiner});
            }
        });
    });
}

/**
 *  Updates an test's examiner returning a {code, content} result
 */
function update(testId, examinerId, newExaminerId, roomId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var examiner = test.examiners.id(examinerId);
                if(!examiner) reject({code: msg.TEST_EXAMINER_NOT_EXISTS});
                else{
                    if(newExaminerId) examiner.examinerId = newExaminerId;
                    if(roomId) examiner.roomId = roomId;
                    var itemsLikeIt = test.examiners.filter(function(currentItem){
                        return utils.isTheSame(currentItem, {examinerId:examiner.examinerId, active:true});
                    });
                    itemsLikeIt= utils.removeSelf(itemsLikeIt, examiner);
                    if(itemsLikeIt.length >0) reject({code:msg.TEST_EXAMINER_EXISTS})
                    else{
                        test.save(function(){resolve({code:msg.TEST_EXAMINER_UPDATED, content:examiner._id})})
                    }   
                }
            }
        });
    });
}

/**
 *  Activates / Deactivates an test's examiner examiner returning a {code, content} result
 */
function toggle(testId, examinerId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test)reject({code:msg.TEST_NOT_EXISTS});
            else{
                var examiner = test.examiners.id(examinerId);
                if(!examiner) reject({code: msg.TEST_EXAMINER_NOT_EXIST});
                else{
                    if(examiner.active){
                        examiner.active=false;
                        test.save(function(){resolve({code:msg.TEST_EXAMINER_TOGGLED, content:test._id})})
                    }
                    else{
                        var itemsLikeIt = test.examiners.filter(function(currentItem){
                            return utils.isTheSame(currentItem, {examinerId:examiner.examinerId, active:true});
                        });
                        itemsLikeIt = utils.removeSelf(itemsLikeIt, examiner);
                        if(itemsLikeIt.length >0) reject({code:msg.TEST_EXAMINER_EXISTS})
                        else{
                            examiner.active=true;
                            test.save(function(){resolve({code:msg.TEST_EXAMINER_TOGGLED, content:examiner._id})})
                        }   
                    }
                }
            }
        });
    });
}

/**
 * Searches for test's examiners returning a {code, content} result that may include the Examiners' list
 */
function list(testId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test) reject({code: msg.TEST_NOT_EXISTS});
            else resolve({code:msg.TEST_EXAMINERS_FETCH, content:test.examiners});
        });
    })
}

module.exports = {create, get, update, toggle, list}