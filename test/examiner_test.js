const mocha = require('mocha');
const assert = require('assert');
const Model = require('../src/Data/Examiner').Examiner;
const Examiner = require('../src/DataAccess/Examiners/Examiner');
const Record = require('../src/DataAccess/Examiners/Record');
const Test = require('../src/DataAccess/Examiners/Test');
const msg = require('../src/DataAccess/Generics/messages');

require('../src/Config/connect')();

describe("testing examiner collection", function() {
    var examiner0 = "5b3028b6c800295030896ad8";
    var examiner1 = null;
    var examiner2 = null;
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
      Examiner.create(13782895, "José Pereira").then(function(res){;examiner1 = res.content; assert(res.code === msg.EXAMINER_REGISTER); done();});
    });
    
    it("saves a record on the database", function(done) {
      Examiner.create(13782896, "Graça Fraga").then(function(res){examiner2 = res.content;  assert(res.code === msg.EXAMINER_REGISTER); done();});
    });
    
    it("saves the same record on the database and fails", function(done) {
      Examiner.create(13782895, "José Pereira").then(function(res){}).catch((res)=>{assert(res.code === msg.EXAMINER_EXISTS);done();});
    });

    it("lists the records on the database", function(done) {
      Examiner.list().then(function(res){assert(res.content.length === 2 && examiner1 == res.content[0]._id.toString() && examiner2 == res.content[1]._id.toString());done();});
    });

    it("reads the first examiner", function(done){
      Examiner.get(examiner1).then(function(res){assert(res.code == msg.EXAMINER_FETCH && res.content.name == "José Pereira"); done();})
    })

    it("reads the first examiner", function(done){
      Examiner.get(examiner2).then(function(res){assert(res.code == msg.EXAMINER_FETCH && res.content.name == "Graça Fraga"); done();})
    })
    
    it("fails to read unknown examiner", function(done){
      Examiner.get(examiner0).catch(function(res){assert(res.code == msg.EXAMINER_NOT_EXISTS); done();})
    })

    it("updates a record on the database", function(done){
      Examiner.update(examiner1, null, "José Sena Pereira").then(function(res){assert(res.code == msg.EXAMINER_UPDATED); done();});
    });

    it("updates a record on the database to the same unique value as the first one and fails", function(done){
      Examiner.update(examiner2, 13782895).catch(function(res){assert(res.code == msg.EXAMINER_EXISTS); done();});
    });

    it("deactivates the first record", function(done){
      Examiner.toggle(examiner1).then(function(res){assert(res.code == msg.EXAMINER_TOGGLED); done();});
    })

    it("updates a record on the database to the same unique value as the first one successfully because it's innactive", function(done){
      Examiner.update(examiner2, 13782895).then(function(res){assert(res.code == msg.EXAMINER_UPDATED); done();});
    });

    it("fails activating the first record", function(done){ 
      Examiner.toggle(examiner1).catch(function(res){assert(res.code == msg.EXAMINER_EXISTS); done();});
    })

    it("updates the second examiner to it's previous value", function(done){
      Examiner.update(examiner2, 13782896).then(function(res){assert(res.code == msg.EXAMINER_UPDATED); done();});
    });
    
    it("activates the first record", function(done){
      Examiner.toggle(examiner1).then(function(res){assert(res.code == msg.EXAMINER_TOGGLED); done();});
    })

    it("fails to create a record on an inexisting examiner", function(done){
      Record.create(examiner0, "2019/2020").catch(function(res){assert(res.code == msg.EXAMINER_NOT_EXISTS); done();});
    })

    it("creates a new record for the first examiner", function(done){
      Record.create(examiner1, "2018/2019").then(function(res){record1 = res.content; assert(res.code == msg.EXAMINER_RECORD_REGISTER); done();})
    })

    it("creates a new record for the first examiner", function(done){
      Record.create(examiner1, "2019/2020").then(function(res){record2 = res.content; assert(res.code == msg.EXAMINER_RECORD_REGISTER); done();})
    })

    it("fails to create a new record for the first examiner", function(done){
      Record.create(examiner1, "2018/2019").catch(function(res){assert(res.code == msg.EXAMINER_RECORD_EXISTS); done();})
    })

    it("lists the records on the database", function(done) {
      Record.list(examiner1).then(function(res){assert(res.content.length === 2 && record1 == res.content[0]._id.toString() && record2 == res.content[1]._id.toString());done();});
    });

    it("reads the first record", function(done){
      Record.get(examiner1, record1).then(function(res){assert(res.code == msg.EXAMINER_RECORD_FETCH && res.content.year == "2018/2019"); done();})
    })

    it("reads the first record", function(done){
      Record.get(examiner1, record2).then(function(res){assert(res.code == msg.EXAMINER_RECORD_FETCH && res.content.year == "2019/2020"); done();})
    })
    
    it("fails to read unknown record", function(done){
      Record.get(examiner1, record0).catch(function(res){assert(res.code == msg.EXAMINER_RECORD_NOT_EXIST); done();})
    })

    it("updates a record on the database to the same unique value as the first one and fails", function(done){
      Record.update(examiner1, record2, "2018/2019").catch(function(res){assert(res.code == msg.EXAMINER_RECORD_EXISTS); done();});
    });

    it("deactivates the first record", function(done){
      Record.toggle(examiner1, record1).then(function(res){assert(res.code == msg.EXAMINER_RECORD_TOGGLED); done();});
    })

    it("updates a record on the database to the same unique value as the first one successfully because it's innactive", function(done){
      Record.update(examiner1, record2, "2018/2019").then(function(res){assert(res.code == msg.EXAMINER_RECORD_UPDATED); done();});
    });

    it("fails activating the first record", function(done){ 
      Record.toggle(examiner1, record1).catch(function(res){assert(res.code == msg.EXAMINER_RECORD_EXISTS); done();});
    })

    it("updates the second record to it's previous value", function(done){
      Record.update(examiner1, record2, "2019/2020").then(function(res){assert(res.code == msg.EXAMINER_RECORD_UPDATED); done();});
    });
    
    it("activates the first record", function(done){
      Record.toggle(examiner1, record1).then(function(res){assert(res.code == msg.EXAMINER_RECORD_TOGGLED); done();});
    })

    it("fails to create a test on an inexisting examiner", function(done){
        Test.create(examiner0, record0, 2133).catch(function(res){ assert(res.code == msg.EXAMINER_NOT_EXISTS); done();});
    })
  
    it("fails to create a test on an inexisting record", function(done){
    Test.create(examiner1, record0, 2133).catch(function(res){assert(res.code == msg.EXAMINER_RECORD_NOT_EXISTS); done();});
    })
    
    it("creates a new test for the first examiner's first record", function(done){
    Test.create(examiner1, record1, 2133).then(function(res){test1 = res.content; assert(res.code == msg.EXAMINER_TEST_REGISTER); done();})
    })

    it("creates a new test for the first examiner's first record", function(done){
    Test.create(examiner1, record1, 2134).then(function(res){test2 = res.content; assert(res.code == msg.EXAMINER_TEST_REGISTER); done();})
    })

    it("fails to create a new record for the first examiner", function(done){
    Test.create(examiner1, record1, 2133).catch(function(res){assert(res.code == msg.EXAMINER_TEST_EXISTS); done();})
    })

    it("lists the tests on the first record", function(done) {
    Test.list(examiner1, record1).then(function(res){assert(res.content.length === 2 && test1 == res.content[0]._id.toString() && test2 == res.content[1]._id.toString());done();});
    });

    it("reads the first test", function(done){
    Test.get(examiner1, record1, test1).then(function(res){assert(res.code == msg.EXAMINER_TEST_FETCH && res.content.testId == '2133'); done();})
    })

    it("reads the second test", function(done){
    Test.get(examiner1, record1, test2).then(function(res){assert(res.code == msg.EXAMINER_TEST_FETCH && res.content.testId == '2134'); done();})
    })
    
    it("fails to read unknown test", function(done){
        Test.get(examiner1, record1, test0).catch(function(res){assert(res.code == msg.EXAMINER_TEST_NOT_EXISTS); done();})
    })

    it("updates a test on the database to the same unique value as the first one and fails", function(done){
        Test.update(examiner1, record1, test2, 2133).catch(function(res){assert(res.code == msg.EXAMINER_TEST_EXISTS); done();});
    });

    it("deactivates the first test", function(done){
        Test.toggle(examiner1, record1, test1).then(function(res){assert(res.code == msg.EXAMINER_TEST_TOGGLED); done();});
    })

    it("updates a test on the database to the same unique value as the first one successfully because it's innactive", function(done){
    Test.update(examiner1, record1, test2, 2133).then(function(res){assert(res.code == msg.EXAMINER_TEST_UPDATED); done();});
    });

    it("fails activating the first test", function(done){ 
        Test.toggle(examiner1, record1, test1).catch(function(res){assert(res.code == msg.EXAMINER_TEST_EXISTS); done();});
    })

    it("updates the second record to it's previous value", function(done){
        Test.update(examiner1, record1,test2, 2134).then(function(res){assert(res.code == msg.EXAMINER_TEST_UPDATED); done();});
    });
    it("activates the first record", function(done){
        Test.toggle(examiner1, record1, test1).then(function(res){assert(res.code == msg.EXAMINER_TEST_TOGGLED); done();});
    })
  

});