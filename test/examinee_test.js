const mocha = require('mocha');
const assert = require('assert');
const Model = require('../src/Data/Examinee').Examinee;
const Examinee = require('../src/DataAccess/Examinees/Examinee');
const Record = require('../src/DataAccess/Examinees/Record');
const Test = require('../src/DataAccess/Examinees/Test');
const msg = require('../src/DataAccess/Generics/messages');

require('../src/Config/connect')();

describe("testing examinee collection", function() {
    var examinee0 = "5b3028b6c800295030896ad8";
    var examinee1 = null;
    var examinee2 = null;
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
      Examinee.create(13782895, "Fábio Jesus").then(function(res){;examinee1 = res.content; assert(res.code === msg.EXAMINEE_REGISTER); done();});
    });
    
    it("saves a record on the database", function(done) {
      Examinee.create(13782896, "Pedro Costa").then(function(res){examinee2 = res.content;  assert(res.code === msg.EXAMINEE_REGISTER); done();});
    });
    
    it("saves the same record on the database and fails", function(done) {
      Examinee.create(13782895, "Fábio Jesus").then(function(res){}).catch((res)=>{assert(res.code === msg.EXAMINEE_EXISTS);done();});
    });

    it("lists the records on the database", function(done) {
      Examinee.list().then(function(res){assert(res.content.length === 2 && examinee1 == res.content[0]._id.toString() && examinee2 == res.content[1]._id.toString());done();});
    });

    it("reads the first examinee", function(done){
      Examinee.get(examinee1).then(function(res){assert(res.code == msg.EXAMINEE_FETCH && res.content.name == "Fábio Jesus"); done();})
    })

    it("reads the first examinee", function(done){
      Examinee.get(examinee2).then(function(res){assert(res.code == msg.EXAMINEE_FETCH && res.content.name == "Pedro Costa"); done();})
    })
    
    it("fails to read unknown examinee", function(done){
      Examinee.get(examinee0).catch(function(res){assert(res.code == msg.EXAMINEE_NOT_EXISTS); done();})
    })

    it("updates a record on the database", function(done){
      Examinee.update(examinee1, null, "Fábio Miguel Jesus").then(function(res){assert(res.code == msg.EXAMINEE_UPDATED); done();});
    });

    it("updates a record on the database to the same unique value as the first one and fails", function(done){
      Examinee.update(examinee2, 13782895).catch(function(res){assert(res.code == msg.EXAMINEE_EXISTS); done();});
    });

    it("deactivates the first record", function(done){
      Examinee.toggle(examinee1).then(function(res){assert(res.code == msg.EXAMINEE_TOGGLED); done();});
    })

    it("updates a record on the database to the same unique value as the first one successfully because it's innactive", function(done){
      Examinee.update(examinee2, 13782895).then(function(res){assert(res.code == msg.EXAMINEE_UPDATED); done();});
    });

    it("fails activating the first record", function(done){ 
      Examinee.toggle(examinee1).catch(function(res){assert(res.code == msg.EXAMINEE_EXISTS); done();});
    })

    it("updates the second examinee to it's previous value", function(done){
      Examinee.update(examinee2, 13782896).then(function(res){assert(res.code == msg.EXAMINEE_UPDATED); done();});
    });
    
    it("activates the first record", function(done){
      Examinee.toggle(examinee1).then(function(res){assert(res.code == msg.EXAMINEE_TOGGLED); done();});
    })

    it("fails to create a record on an inexisting examinee", function(done){
      Record.create(examinee0, "2019", "MSI", "11").catch(function(res){assert(res.code == msg.EXAMINEE_NOT_EXISTS); done();});
    })

    it("creates a new record for the first examinee", function(done){
      Record.create(examinee1, "2018/2019", "MES", "170001").then(function(res){record1 = res.content; assert(res.code == msg.EXAMINEE_RECORD_REGISTER); done();})
    })

    it("creates a new record for the first examinee", function(done){
      Record.create(examinee1, "2019/2020", "MES", "170001").then(function(res){record2 = res.content; assert(res.code == msg.EXAMINEE_RECORD_REGISTER); done();})
    })

    it("fails to create a new record for the first examinee", function(done){
      Record.create(examinee1, "2018/2019", "MES", "170001").catch(function(res){assert(res.code == msg.EXAMINEE_RECORD_EXISTS); done();})
    })

    it("lists the records on the database", function(done) {
      Record.list(examinee1).then(function(res){assert(res.content.length === 2 && record1 == res.content[0]._id.toString() && record2 == res.content[1]._id.toString());done();});
    });

    it("reads the first record", function(done){
      Record.get(examinee1, record1).then(function(res){assert(res.code == msg.EXAMINEE_RECORD_FETCH && res.content.year == "2018/2019"); done();})
    })

    it("reads the first record", function(done){
      Record.get(examinee1, record2).then(function(res){assert(res.code == msg.EXAMINEE_RECORD_FETCH && res.content.year == "2019/2020"); done();})
    })
    
    it("fails to read unknown record", function(done){
      Record.get(examinee1, record0).catch(function(res){assert(res.code == msg.EXAMINEE_RECORD_NOT_EXIST); done();})
    })

    it("updates a record on the database", function(done){
      Record.update(examinee1, record1, null, "MIG" ).then(function(res){assert(res.code == msg.EXAMINEE_RECORD_UPDATED); done();});
    });

    it("updates a record on the database to the same unique value as the first one and fails", function(done){
      Record.update(examinee1, record2, "2018/2019", "MES", "170001").catch(function(res){assert(res.code == msg.EXAMINEE_RECORD_EXISTS); done();});
    });

    it("deactivates the first record", function(done){
      Record.toggle(examinee1, record1).then(function(res){assert(res.code == msg.EXAMINEE_RECORD_TOGGLED); done();});
    })

    it("updates a record on the database to the same unique value as the first one successfully because it's innactive", function(done){
      Record.update(examinee1, record2, "2018/2019", "MES", "170001").then(function(res){assert(res.code == msg.EXAMINEE_RECORD_UPDATED); done();});
    });

    it("fails activating the first record", function(done){ 
      Record.toggle(examinee1, record1).catch(function(res){assert(res.code == msg.EXAMINEE_RECORD_EXISTS); done();});
    })

    it("updates the second record to it's previous value", function(done){
      Record.update(examinee1, record2, "2019/2020", "MES", "170001").then(function(res){assert(res.code == msg.EXAMINEE_RECORD_UPDATED); done();});
    });
    
    it("activates the first record", function(done){
      Record.toggle(examinee1, record1).then(function(res){assert(res.code == msg.EXAMINEE_RECORD_TOGGLED); done();});
    })

    it("fails to create a test on an inexisting examinee", function(done){
      Test.create(examinee0, record0, 2133).catch(function(res){ assert(res.code == msg.EXAMINEE_NOT_EXISTS); done();});
    })

    it("fails to create a test on an inexisting record", function(done){
      Test.create(examinee1, record0, 2133).catch(function(res){assert(res.code == msg.EXAMINEE_RECORD_NOT_EXISTS); done();});
    })
    
    it("creates a new test for the first examinee's first record", function(done){
      Test.create(examinee1, record1, 2133).then(function(res){test1 = res.content; assert(res.code == msg.EXAMINEE_TEST_REGISTER); done();})
    })

    it("creates a new test for the first examinee's first record", function(done){
      Test.create(examinee1, record1, 2134).then(function(res){test2 = res.content; assert(res.code == msg.EXAMINEE_TEST_REGISTER); done();})
    })

    it("fails to create a new record for the first examinee", function(done){
      Test.create(examinee1, record1, 2133).catch(function(res){assert(res.code == msg.EXAMINEE_TEST_EXISTS); done();})
    })

    it("lists the tests on the first record", function(done) {
      Test.list(examinee1, record1).then(function(res){assert(res.content.length === 2 && test1 == res.content[0]._id.toString() && test2 == res.content[1]._id.toString());done();});
    });

    it("reads the first test", function(done){
      Test.get(examinee1, record1, test1).then(function(res){assert(res.code == msg.EXAMINEE_TEST_FETCH && res.content.testId == '2133'); done();})
    })

    it("reads the second test", function(done){
      Test.get(examinee1, record1, test2).then(function(res){assert(res.code == msg.EXAMINEE_TEST_FETCH && res.content.testId == '2134'); done();})
    })
    
    it("fails to read unknown test", function(done){
        Test.get(examinee1, record1, test0).catch(function(res){assert(res.code == msg.EXAMINEE_TEST_NOT_EXISTS); done();})
    })

    it("updates a test on the database to the same unique value as the first one and fails", function(done){
        Test.update(examinee1, record1, test2, 2133).catch(function(res){assert(res.code == msg.EXAMINEE_TEST_EXISTS); done();});
    });

    it("deactivates the first test", function(done){
        Test.toggle(examinee1, record1, test1).then(function(res){assert(res.code == msg.EXAMINEE_TEST_TOGGLED); done();});
    })

    it("updates a test on the database to the same unique value as the first one successfully because it's innactive", function(done){
      Test.update(examinee1, record1, test2, 2133).then(function(res){assert(res.code == msg.EXAMINEE_TEST_UPDATED); done();});
    });

    it("fails activating the first test", function(done){ 
        Test.toggle(examinee1, record1, test1).catch(function(res){assert(res.code == msg.EXAMINEE_TEST_EXISTS); done();});
    })

    it("updates the second record to it's previous value", function(done){
        Test.update(examinee1, record1,test2, 2134).then(function(res){assert(res.code == msg.EXAMINEE_TEST_UPDATED); done();});
    });
    it("activates the first record", function(done){
        Test.toggle(examinee1, record1, test1).then(function(res){assert(res.code == msg.EXAMINEE_TEST_TOGGLED); done();});
    })

});