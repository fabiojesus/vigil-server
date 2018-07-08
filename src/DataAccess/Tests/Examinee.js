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
            if(!test){reject({code:msg.TEST_NOT_EXISTS}); return;}
            var itemsLikeIt = test.examinees.filter(function(currentItem){return utils.isTheSame(currentItem, {examineeId:examineeId, isDeleted:false});});
            if(itemsLikeIt.length > 0) {reject({code:msg.TEST_EXAMINEE_EXISTS}); return;}
            var newExaminee = new Examinee({examineeId:examineeId, isDeleted:false});
            test.examinees.push(newExaminee);
            test.save(function(){resolve({code:msg.TEST_EXAMINEE_REGISTER, content:newExaminee._id})});
        });
    });
}

/**
 * Searches for an test's examinee examinee returning a {code, content} result that may contain the examinee
 */
function get(testId, examineeId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test){reject({code:msg.TEST_NOT_EXISTS}); return;}
            var examinee = test.examinees.id(examineeId);
            if(!examinee) {reject({code: msg.TEST_EXAMINEE_NOT_EXISTS}); return;}
            resolve({code:msg.TEST_EXAMINEE_FETCH, content:examinee});
        });
    });
}

/**
 *  Updates an test's examinee returning a {code, content} result
 */
function update(testId, examineeId, newExamineeId, roomId, seat, registered, sheetNumber, presence){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test){reject({code:msg.TEST_NOT_EXISTS}); return;}
            var examinee = test.examinees.filter(function(examinee){return(examinee.examineeId == examineeId)});
            examinee = examinee[0];
            if(!examinee) {reject({code: msg.TEST_EXAMINEE_NOT_EXISTS}); return;}
            if(newExamineeId) examinee.examineeId = newExamineeId;
            if(roomId) examinee.roomId = roomId;
            if(seat) examinee.seat = seat;
            if(registered) examinee.registered = registered;
            if(sheetNumber) examinee.sheetNumber = sheetNumber;
            if(presence) examinee.presence = presence;
            var itemsLikeIt = test.examinees.filter(function(currentItem){ return utils.isTheSame(currentItem, {examineeId:examinee.examineeId, isDeleted:false});});
            itemsLikeIt= utils.removeSelf(itemsLikeIt, examinee);
            if(itemsLikeIt.length >0) {reject({code:msg.TEST_EXAMINEE_EXISTS}); return;}
            test.save(function(){resolve({code:msg.TEST_EXAMINEE_UPDATED, content:examinee._id})})
        });
    });
}

function erase(testId, examineeId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test){reject({code:msg.TEST_NOT_EXISTS}); return;}
            var examinee = test.examinee.id(examineeId);
            if(!examinee) {reject({code: msg.TEST_EXAMINEE_NOT_EXIST}); return;}
            examinee.isDeleted=true;
            test.save(function(){resolve({code:msg.TEST_EXAMINEE_DELETED, content:examinee._id})})
        });
    });
}

/**
 * Searches for test's examinees returning a {code, content} result that may include the Examinees' list
 */
function list(testId){
    return new Promise(function(resolve, reject){
        Test.findById(testId).then(function(test){
            if(!test) {reject({code: msg.TEST_NOT_EXISTS}); return;}
            resolve({code:msg.TEST_EXAMINEES_FETCH, content:test.examinees});
        });
    })
}

module.exports = {create, get, update, erase, list}