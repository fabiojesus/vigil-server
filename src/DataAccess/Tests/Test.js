const Test = require('../../Data/Test').Test;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new Test record returning a {code, content} result
 */
function create(year, confirmationDate, dateStart, dateEnd, subjectId, type){
    return new Promise(function(resolve, reject){
        Test.find({subjectId:subjectId, dateStart:dateStart, isDeleted:false}).then(function(tests){
            if(tests.length>0) {reject({code:msg.TEST_EXISTS}); return;}
            var test = new Test({year:year, confirmationDate:confirmationDate, dateStart:dateStart, 
                                 type:type, dateEnd:dateEnd, subjectId:subjectId, isDeleted:false});
            test.save(function(){resolve({code:msg.TEST_REGISTER, content:test._id})});
        }).catch(function(res){reject({code:msg.TESTS_NOT_EXIST})});
    });
}

/**
 * Searches for an Test record returning a {code, content} result that may contain the record
 */
function get(id){
    return new Promise(function(resolve, reject){
        Test.findById(id).then(function(test){
            if(!test) {reject({code:msg.TEST_NOT_EXISTS}); return;}
            resolve({code:msg.TEST_FETCH, content:test});
        });
    });
}

/**
 *  Updates an existing Test Record returning a {code, content} result
 */
function update(id, year, confirmationDate, dateStart, dateEnd, subjectId, type){
    return new Promise(function(resolve, reject){
        Test.findById(id).then(function(test){
            if(year) test.year = year;
            if(confirmationDate) test.confirmationDate = confirmationDate;
            if(dateStart) test.dateStart = dateStart;
            if(dateEnd) test.dateEnd = dateEnd;
            if(subjectId) test.subjectId = subjectId;
            if(type) test.type = type;
            Test.find({subjectId:test.subjectId, dateStart:test.dateStart, isDeleted:false, _id: {$ne: test._id}}).then(function(tests){
                if(tests.length>0) {reject({code:msg.TEST_EXISTS}); return;}
                test.save(function(){resolve({code:msg.TEST_UPDATED, content:test._id})});    
            });
        }).catch(function(){resolve({code:msg.TEST_NOT_EXISTS})})
    });
}

function erase(id){
    return new Promise(function(resolve, reject){
        Test.findById(id).then(function(test){
            if(!test) {reject({code:msg.SUBJECT_NOT_EXISTS}); return;}
            if(!utils.isEmpty(examinee.examinees)){reject({code:msg.SUBJECT_HAS_EXAMINEES}); return;}
            if(!utils.isEmpty(examinee.examiners)){reject({code:msg.SUBJECT_HAS_EXAMINERS}); return;}
            if(!utils.isEmpty(examinee.rooms)){reject({code:msg.SUBJECT_HAS_ROOMS}); return;}
            test.isDeleted = true;
            test.save(function(){resolve({code:msg.SUBJECT_DELETED, content:test._id})});
        }).catch(function(res){reject(res)})
    });
}

/**
 * Searches for all Test Records returning a {code, content} result that may include the tests' list
 */
function list(){
    return new Promise(function(resolve, reject){
        Test.find({}).then(function(result){resolve({code: msg.TESTS_FETCH, content:result});}).catch(function(){resolve({code:msg.TESTS_NOT_EXIST});});
    });
}

module.exports = {create, get, update, erase, list};