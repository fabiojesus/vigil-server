const mocha = require('mocha');
const assert = require('assert');
const Model = require('../src/Data/Subject').Subject;
const Subject = require('../src/DataAccess/Subjects/Subject');
const Record = require('../src/DataAccess/Subjects/Record');
const Test = require('../src/DataAccess/Subjects/Test');
const msg = require('../src/DataAccess/Generics/messages');

require('../src/Config/connect')();

describe("testing subject collection", function() {
    var subject0 = "5b3028b6c800295030896ad8";
    var subject1 = null;
    var subject2 = null;
    var record0 = "5b3028b6c800295030896ad8";
    var record1 = null;
    var record2 = null;
    var test0 = "5b3028b6c800295030896ad8";
    var test1 = null;
    var test2 = null;

    it("clear", function(done){
      Model.remove({}).then(function(res){
        done();
      });
    });
  
    it("saves a record on the database", function(done) {
      Subject.create("IPOO", "Computer Science").then(function(res){;subject1 = res.content; assert(res.code === msg.SUBJECT_REGISTER); done();});
    });
    
    it("saves a record on the database", function(done) {
      Subject.create("Algebra", "Mathematics").then(function(res){subject2 = res.content;  assert(res.code === msg.SUBJECT_REGISTER); done();});
    });
    
    it("saves the same record on the database and fails", function(done) {
      Subject.create("IPOO", "Computer Science").then(function(res){}).catch((res)=>{assert(res.code === msg.SUBJECT_EXISTS);done();});
    });

    it("lists the records on the database", function(done) {
      Subject.list().then(function(res){assert(res.content.length === 2 && subject1 == res.content[0]._id.toString() && subject2 == res.content[1]._id.toString());done();});
    });

    it("reads the first subject", function(done){
      Subject.get(subject1).then(function(res){assert(res.code == msg.SUBJECT_FETCH && res.content.name == "IPOO"); done();})
    })

    it("reads the first subject", function(done){
      Subject.get(subject2).then(function(res){assert(res.code == msg.SUBJECT_FETCH && res.content.name == "Algebra"); done();})
    })
    
    it("fails to read unknown subject", function(done){
      Subject.get(subject0).catch(function(res){assert(res.code == msg.SUBJECT_NOT_EXISTS); done();})
    })

    it("updates a record on the database", function(done){
      Subject.update(subject1, null, 32).then(function(res){assert(res.code == msg.SUBJECT_UPDATED); done();});
    });

    it("updates a record on the database to the same unique value as the first one and fails", function(done){
      Subject.update(subject2, "IPOO").catch(function(res){assert(res.code == msg.SUBJECT_EXISTS); done();});
    });

    it("deactivates the first record", function(done){
      Subject.toggle(subject1).then(function(res){assert(res.code == msg.SUBJECT_TOGGLED); done();});
    })

    it("updates a record on the database to the same unique value as the first one successfully because it's innactive", function(done){
      Subject.update(subject2, "IPOO").then(function(res){assert(res.code == msg.SUBJECT_UPDATED); done();});
    });

    it("fails activating the first record", function(done){ 
      Subject.toggle(subject1).catch(function(res){assert(res.code == msg.SUBJECT_EXISTS); done();});
    })

    it("updates the second subject to it's previous value", function(done){
      Subject.update(subject2, "Algebra").then(function(res){assert(res.code == msg.SUBJECT_UPDATED); done();});
    });
    
    it("activates the first record", function(done){
      Subject.toggle(subject1).then(function(res){assert(res.code == msg.SUBJECT_TOGGLED); done();});
    })

    it("fails to create a record on an inexisting subject", function(done){
      Record.create(subject0, "2019/2020").catch(function(res){assert(res.code == msg.SUBJECT_NOT_EXISTS); done();});
    })

    it("creates a new record for the first subject", function(done){
      Record.create(subject1, "2018/2019").then(function(res){record1 = res.content; assert(res.code == msg.SUBJECT_RECORD_REGISTER); done();})
    })

    it("creates a new record for the first subject", function(done){
      Record.create(subject1, "2019/2020").then(function(res){record2 = res.content; assert(res.code == msg.SUBJECT_RECORD_REGISTER); done();})
    })

    it("fails to create a new record for the first subject", function(done){
      Record.create(subject1, "2018/2019").catch(function(res){assert(res.code == msg.SUBJECT_RECORD_EXISTS); done();})
    })

    it("lists the records on the database", function(done) {
      Record.list(subject1).then(function(res){assert(res.content.length === 2 && record1 == res.content[0]._id.toString() && record2 == res.content[1]._id.toString());done();});
    });

    it("reads the first record", function(done){
      Record.get(subject1, record1).then(function(res){assert(res.code == msg.SUBJECT_RECORD_FETCH && res.content.year == "2018/2019"); done();})
    })

    it("reads the first record", function(done){
      Record.get(subject1, record2).then(function(res){assert(res.code == msg.SUBJECT_RECORD_FETCH && res.content.year == "2019/2020"); done();})
    })
    
    it("fails to read unknown record", function(done){
      Record.get(subject1, record0).catch(function(res){assert(res.code == msg.SUBJECT_RECORD_NOT_EXIST); done();})
    })

    it("updates a record on the database to the same unique value as the first one and fails", function(done){
      Record.update(subject1, record2, "2018/2019").catch(function(res){assert(res.code == msg.SUBJECT_RECORD_EXISTS); done();});
    });

    it("deactivates the first record", function(done){
      Record.toggle(subject1, record1).then(function(res){assert(res.code == msg.SUBJECT_RECORD_TOGGLED); done();});
    })

    it("updates a record on the database to the same unique value as the first one successfully because it's innactive", function(done){
      Record.update(subject1, record2, "2018/2019").then(function(res){assert(res.code == msg.SUBJECT_RECORD_UPDATED); done();});
    });

    it("fails activating the first record", function(done){ 
      Record.toggle(subject1, record1).catch(function(res){assert(res.code == msg.SUBJECT_RECORD_EXISTS); done();});
    })

    it("updates the second record to it's previous value", function(done){
      Record.update(subject1, record2, "2019/2020").then(function(res){assert(res.code == msg.SUBJECT_RECORD_UPDATED); done();});
    });
    
    it("activates the first record", function(done){
      Record.toggle(subject1, record1).then(function(res){assert(res.code == msg.SUBJECT_RECORD_TOGGLED); done();});
    })

    it("fails to create a test on an inexisting subject", function(done){
        Test.create(subject0, record0, 2133).catch(function(res){ assert(res.code == msg.SUBJECT_NOT_EXISTS); done();});
    })
  
    it("fails to create a test on an inexisting record", function(done){
    Test.create(subject1, record0, 2133).catch(function(res){assert(res.code == msg.SUBJECT_RECORD_NOT_EXISTS); done();});
    })
    
    it("creates a new test for the first subject's first record", function(done){
    Test.create(subject1, record1, 2133).then(function(res){test1 = res.content; assert(res.code == msg.SUBJECT_TEST_REGISTER); done();})
    })

    it("creates a new test for the first subject's first record", function(done){
    Test.create(subject1, record1, 2134).then(function(res){test2 = res.content; assert(res.code == msg.SUBJECT_TEST_REGISTER); done();})
    })

    it("fails to create a new record for the first subject", function(done){
    Test.create(subject1, record1, 2133).catch(function(res){assert(res.code == msg.SUBJECT_TEST_EXISTS); done();})
    })

    it("lists the tests on the first record", function(done) {
    Test.list(subject1, record1).then(function(res){assert(res.content.length === 2 && test1 == res.content[0]._id.toString() && test2 == res.content[1]._id.toString());done();});
    });

    it("reads the first test", function(done){
    Test.get(subject1, record1, test1).then(function(res){assert(res.code == msg.SUBJECT_TEST_FETCH && res.content.testId == '2133'); done();})
    })

    it("reads the second test", function(done){
    Test.get(subject1, record1, test2).then(function(res){assert(res.code == msg.SUBJECT_TEST_FETCH && res.content.testId == '2134'); done();})
    })
    
    it("fails to read unknown test", function(done){
        Test.get(subject1, record1, test0).catch(function(res){assert(res.code == msg.SUBJECT_TEST_NOT_EXISTS); done();})
    })

    it("updates a test on the database to the same unique value as the first one and fails", function(done){
        Test.update(subject1, record1, test2, 2133).catch(function(res){assert(res.code == msg.SUBJECT_TEST_EXISTS); done();});
    });

    it("deactivates the first test", function(done){
        Test.toggle(subject1, record1, test1).then(function(res){assert(res.code == msg.SUBJECT_TEST_TOGGLED); done();});
    })

    it("updates a test on the database to the same unique value as the first one successfully because it's innactive", function(done){
    Test.update(subject1, record1, test2, 2133).then(function(res){assert(res.code == msg.SUBJECT_TEST_UPDATED); done();});
    });

    it("fails activating the first test", function(done){ 
        Test.toggle(subject1, record1, test1).catch(function(res){assert(res.code == msg.SUBJECT_TEST_EXISTS); done();});
    })

    it("updates the second record to it's previous value", function(done){
        Test.update(subject1, record1,test2, 2134).then(function(res){assert(res.code == msg.SUBJECT_TEST_UPDATED); done();});
    });
    it("activates the first record", function(done){
        Test.toggle(subject1, record1, test1).then(function(res){assert(res.code == msg.SUBJECT_TEST_TOGGLED); done();});
    })
  

});