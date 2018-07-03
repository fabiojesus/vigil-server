const Test = require('../../Data/Test').Test;
const msg = require('../../Config/messages');
const utils = require('../acessUtils');

/**
 * Creates a new Test record returning a {code, content} result
 */
function create(year, confirmationDate, dateStart, dateEnd, subjectId, type){
    return new Promise(function(resolve, reject){
        Test.find({subjectId:subjectId, dateStart:dateStart, active:true})
                .then(function(tests){
                    if(tests.length>0) reject({code:msg.TEST_EXISTS});
                    else{
                        var test = new Test({
                                                year:year, 
                                                confirmationDate:confirmationDate, 
                                                dateStart:dateStart, 
                                                dateEnd:dateEnd, 
                                                subjectId:subjectId,
                                                type:type,
                                                 active:true});
                        test.save(function(){resolve({code:msg.TEST_REGISTER, content:test._id})});
                    }
                })
                .catch(function(res){reject({code:msg.TESTS_NOT_EXIST})});
    });
}

/**
 * Searches for an Test record returning a {code, content} result that may contain the record
 */
function get(id){
    return new Promise(function(resolve, reject){
        Test.findById(id).then(function(test){
            if(!test) reject({code:msg.TEST_NOT_EXISTS});
            else resolve({code:msg.TEST_FETCH, content:test});
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

            Test.find({subjectId:test.subjectId, dateStart:test.dateStart, active:true, _id: {$ne: test._id}}).then(function(tests){
                if(tests.length>0) reject({code:msg.TEST_EXISTS})
                else{
                    test.save(function(){resolve({code:msg.TEST_UPDATED, content:test._id})});    
                }
            });
        }).catch(function(){resolve({code:msg.TEST_NOT_EXISTS})})
    });
}

/**
 *  Activates / Deactivates an existing Test Record returning a {code, content} result
 */
function toggle(id){
    return new Promise(function(resolve, reject){
        Test.findById(id).then(function(test){
            if(test.active){
                test.active = false;
                test.save(function(){resolve({code:msg.TEST_TOGGLED, content:test._id})})
            }
            else{
                Test.find({subjectId:test.subjectId, dateStart:test.dateStart, active:true, _id: {$ne: test._id}}).then(function(tests){
                    if(tests.length>0) reject({code:msg.TEST_EXISTS})
                    else{
                        test.active = true;
                        test.save(function(){resolve({code:msg.TEST_TOGGLED, content:test._id})});    
                    }
                });
            }
        })
    });
}

/**
 * Searches for all Test Records returning a {code, content} result that may include the tests' list
 */
function list(){
    return new Promise(function(resolve, reject){
        Test.find({}).then(function(result){
            resolve({code: msg.TESTS_FETCH, content:result});
        }).catch(function(){
            resolve({code:msg.TESTS_NOT_EXIST});
        });
    });
}

module.exports = {create, get, update, toggle, list};