const mocha = require('mocha');
const assert = require('assert');
const Model = require('../src/Data/Test').Test;
const Test = require('../src/DataAccess/Tests/Test');
const Room = require('../src/DataAccess/Tests/Room');
const Examiner = require('../src/DataAccess/Tests/Examiner');
const Examinee = require('../src/DataAccess/Tests/Examinee');


const msg = require('../src/DataAccess/Generics/messages');

require('../src/Config/connect')();

describe("testing test collection", function() {
    var test0 = "5b3028b6c800295030896ad8";
    var test1 = null;
    var test2 = null;
    var room0 = "5b3028b6c800295030896ad8";
    var room1 = null;
    var room2 = null;
    var examinee0 = "5b3028b6c800295030896ad8";
    var examinee1 = null;
    var examinee2 = null;
    var examiner0 = "5b3028b6c800295030896ad8";
    var examiner1 = null;
    var examiner2 = null;

    it("clear", function(done){
      Model.remove({}).then(function(res){
        done();
      });
    });
  
    it("saves a record on the database", function(done) {
      Test.create("2018/2019", "tomorrow", "today 18h30", "today 20h30", 123, "test").then(function(res){;test1 = res.content; assert(res.code === msg.TEST_REGISTER); done();});
    });
    
    it("saves a record on the database", function(done) {
      Test.create("2018/2019", "tomorrow", "next month 18h30", "next month 20h30", 123, "test").then(function(res){test2 = res.content;  assert(res.code === msg.TEST_REGISTER); done();});
    });
    
    it("saves the same record on the database and fails", function(done) {
      Test.create("2018/2019", "tomorrow", "today 18h30", "today 20h30", 123, "test").then(function(res){}).catch((res)=>{assert(res.code === msg.TEST_EXISTS);done();});
    });

    it("lists the records on the database", function(done) {
      Test.list().then(function(res){assert(res.content.length === 2 && test1 == res.content[0]._id.toString() && test2 == res.content[1]._id.toString());done();});
    });

    it("reads the first test", function(done){
      Test.get(test1).then(function(res){assert(res.code == msg.TEST_FETCH && res.content.dateStart ==  "today 18h30"); done();})
    })

    it("reads the first test", function(done){
      Test.get(test2).then(function(res){assert(res.code == msg.TEST_FETCH && res.content.dateStart == "next month 18h30"); done();})
    })
    
    it("fails to read unknown test", function(done){
      Test.get(test0).catch(function(res){assert(res.code == msg.TEST_NOT_EXISTS); done();})
    })

    it("updates a record on the database", function(done){
      Test.update(test1, null, "yesterday").then(function(res){assert(res.code == msg.TEST_UPDATED); done();});
    });

    it("updates a record on the database to the same unique value as the first one and fails", function(done){
      Test.update(test2, null, null, "today 18h30", null, 123, null).catch(function(res){assert(res.code == msg.TEST_EXISTS); done();});
    });

    it("deactivates the first record", function(done){
      Test.toggle(test1).then(function(res){assert(res.code == msg.TEST_TOGGLED); done();});
    })

    it("updates a record on the database to the same unique value as the first one successfully because it's innactive", function(done){
      Test.update(test2, null, null, "today 18h30", null, 123, null).then(function(res){assert(res.code == msg.TEST_UPDATED); done();});
    });

    it("fails activating the first record", function(done){ 
      Test.toggle(test1).catch(function(res){assert(res.code == msg.TEST_EXISTS); done();});
    })

    it("updates the second test to it's previous value", function(done){
      Test.update(test2, null, null, "next month 18h30", null, 123, null).then(function(res){assert(res.code == msg.TEST_UPDATED); done();});
    });
    
    it("activates the first record", function(done){
      Test.toggle(test1).then(function(res){assert(res.code == msg.TEST_TOGGLED); done();});
    })

    it("fails to create a room on an inexisting room", function(done){
        Room.create(test0, 2133).catch(function(res){ assert(res.code == msg.TEST_NOT_EXISTS); done();});
    })
    
    it("creates a new test for the first test's first room", function(done){
      Room.create(test1, 2133).then(function(res){room1 = res.content; assert(res.code == msg.TEST_ROOM_REGISTER); done();})
    })

    it("creates a new test for the first test's first room", function(done){
      Room.create(test1, 2134).then(function(res){room2 = res.content; assert(res.code == msg.TEST_ROOM_REGISTER); done();})
    })

    it("fails to create a new room for the first test", function(done){
    Room.create(test1, 2133).catch(function(res){assert(res.code == msg.TEST_ROOM_EXISTS); done();})
    })

    it("lists the rooms on the first test", function(done) {
      Room.list(test1).then(function(res){assert(res.content.length === 2 && room1 == res.content[0]._id.toString() && room2 == res.content[1]._id.toString());done();});
    });

    it("reads the first room", function(done){
      Room.get(test1, room1).then(function(res){assert(res.code == msg.TEST_ROOM_FETCH && res.content.roomId == '2133'); done();})
    })

    it("reads the second room", function(done){
      Room.get(test1, room2).then(function(res){assert(res.code == msg.TEST_ROOM_FETCH && res.content.roomId == '2134'); done();})
    })
    
    it("fails to read unknown room", function(done){
        Room.get(test1, room0).catch(function(res){assert(res.code == msg.TEST_ROOM_NOT_EXISTS); done();})
    })

    it("updates a room on the database to the same unique value as the first one and fails", function(done){
        Room.update(test1, room2, 2133).catch(function(res){assert(res.code == msg.TEST_ROOM_EXISTS); done();});
    });

    it("deactivates the first room", function(done){
        Room.toggle(test1, room1).then(function(res){assert(res.code == msg.TEST_ROOM_TOGGLED); done();});
    })

    it("updates a room on the database to the same unique value as the first one successfully because it's innactive", function(done){
    Room.update(test1, room2, 2133).then(function(res){assert(res.code == msg.TEST_ROOM_UPDATED); done();});
    });

    it("fails activating the first room", function(done){ 
        Room.toggle(test1, room1).catch(function(res){assert(res.code == msg.TEST_ROOM_EXISTS); done();});
    })

    it("updates the second room to it's previous value", function(done){
        Room.update(test1,room2, 2134).then(function(res){assert(res.code == msg.TEST_ROOM_UPDATED); done();});
    });
    it("activates the first room", function(done){
        Room.toggle(test1, room1).then(function(res){assert(res.code == msg.TEST_ROOM_TOGGLED); done();});
    })

    it("fails to create a examiner on an inexisting examiner", function(done){
      Examiner.create(test0, 2133).catch(function(res){ assert(res.code == msg.TEST_NOT_EXISTS); done();});
    })
    
    it("creates a new test for the first test's first examiner", function(done){
      Examiner.create(test1, 2133).then(function(res){examiner1 = res.content; assert(res.code == msg.TEST_EXAMINER_REGISTER); done();})
    })

    it("creates a new test for the first test's first examiner", function(done){
      Examiner.create(test1, 2134).then(function(res){examiner2 = res.content; assert(res.code == msg.TEST_EXAMINER_REGISTER); done();})
    })

    it("fails to create a new examiner for the first test", function(done){
      Examiner.create(test1, 2133).catch(function(res){assert(res.code == msg.TEST_EXAMINER_EXISTS); done();})
    })

    it("lists the examiners on the first test", function(done) {
      Examiner.list(test1).then(function(res){assert(res.content.length === 2 && examiner1 == res.content[0]._id.toString() && examiner2 == res.content[1]._id.toString());done();});
    });

    it("reads the first examiner", function(done){
      Examiner.get(test1, examiner1).then(function(res){assert(res.code == msg.TEST_EXAMINER_FETCH && res.content.examinerId == '2133'); done();})
    })

    it("reads the second examiner", function(done){
      Examiner.get(test1, examiner2).then(function(res){assert(res.code == msg.TEST_EXAMINER_FETCH && res.content.examinerId == '2134'); done();})
    })
    
    it("fails to read unknown examiner", function(done){
      Examiner.get(test1, examiner0).catch(function(res){assert(res.code == msg.TEST_EXAMINER_NOT_EXISTS); done();})
    })

    it("updates a examiner on the database to the same unique value as the first one and fails", function(done){
      Examiner.update(test1, examiner2, 2133).catch(function(res){assert(res.code == msg.TEST_EXAMINER_EXISTS); done();});
    });

    it("deactivates the first examiner", function(done){
      Examiner.toggle(test1, examiner1).then(function(res){assert(res.code == msg.TEST_EXAMINER_TOGGLED); done();});
    })

    it("updates a examiner on the database to the same unique value as the first one successfully because it's innactive", function(done){
      Examiner.update(test1, examiner2, 2133).then(function(res){assert(res.code == msg.TEST_EXAMINER_UPDATED); done();});
    });

    it("fails activating the first examiner", function(done){ 
      Examiner.toggle(test1, examiner1).catch(function(res){assert(res.code == msg.TEST_EXAMINER_EXISTS); done();});
    })

    it("updates the second examiner to it's previous value", function(done){
      Examiner.update(test1,examiner2, 2134, 923).then(function(res){assert(res.code == msg.TEST_EXAMINER_UPDATED); done();});
    });
    it("activates the first examiner", function(done){
      Examiner.toggle(test1, examiner1).then(function(res){assert(res.code == msg.TEST_EXAMINER_TOGGLED); done();});
    });

    it("fails to create a examinee on an inexisting examinee", function(done){
      Examinee.create(test0, 2133).catch(function(res){ assert(res.code == msg.TEST_NOT_EXISTS); done();});
    })
    
    it("creates a new test for the first test's first examinee", function(done){
      Examinee.create(test1, 2133).then(function(res){examinee1 = res.content; assert(res.code == msg.TEST_EXAMINEE_REGISTER); done();})
    })

    it("creates a new test for the first test's first examinee", function(done){
      Examinee.create(test1, 2134).then(function(res){examinee2 = res.content; assert(res.code == msg.TEST_EXAMINEE_REGISTER); done();})
    })

    it("fails to create a new examinee for the first test", function(done){
      Examinee.create(test1, 2133).catch(function(res){assert(res.code == msg.TEST_EXAMINEE_EXISTS); done();})
    })

    it("lists the examinees on the first test", function(done) {
      Examinee.list(test1).then(function(res){assert(res.content.length === 2 && examinee1 == res.content[0]._id.toString() && examinee2 == res.content[1]._id.toString());done();});
    });

    it("reads the first examinee", function(done){
      Examinee.get(test1, examinee1).then(function(res){assert(res.code == msg.TEST_EXAMINEE_FETCH && res.content.examineeId == '2133'); done();})
    })

    it("reads the second examinee", function(done){
      Examinee.get(test1, examinee2).then(function(res){assert(res.code == msg.TEST_EXAMINEE_FETCH && res.content.examineeId == '2134'); done();})
    })
    
    it("fails to read unknown examinee", function(done){
      Examinee.get(test1, examinee0).catch(function(res){assert(res.code == msg.TEST_EXAMINEE_NOT_EXISTS); done();})
    })

    it("updates a examinee on the database to the same unique value as the first one and fails", function(done){
      Examinee.update(test1, examinee2, 2133).catch(function(res){assert(res.code == msg.TEST_EXAMINEE_EXISTS); done();});
    });

    it("deactivates the first examinee", function(done){
      Examinee.toggle(test1, examinee1).then(function(res){assert(res.code == msg.TEST_EXAMINEE_TOGGLED); done();});
    })

    it("updates a examinee on the database to the same unique value as the first one successfully because it's innactive", function(done){
      Examinee.update(test1, examinee2, 2133).then(function(res){assert(res.code == msg.TEST_EXAMINEE_UPDATED); done();});
    });

    it("fails activating the first examinee", function(done){ 
      Examinee.toggle(test1, examinee1).catch(function(res){assert(res.code == msg.TEST_EXAMINEE_EXISTS); done();});
    })

    it("updates the second examinee to it's previous value", function(done){
      Examinee.update(test1,examinee2, 2134, 923, 2, true, "103130", "we0qek012k").then(function(res){assert(res.code == msg.TEST_EXAMINEE_UPDATED); done();});
    });
    it("activates the first examinee", function(done){
      Examinee.toggle(test1, examinee1).then(function(res){assert(res.code == msg.TEST_EXAMINEE_TOGGLED); done();});
    })
});