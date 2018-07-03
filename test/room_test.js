const mocha = require('mocha');
const assert = require('assert');
const Model = require('../src/Data/Room').Room;
const Room = require('../src/DataAccess/Rooms/Room');
const Record = require('../src/DataAccess/Rooms/Record');
const Test = require('../src/DataAccess/Rooms/Test');
const msg = require('../src/DataAccess/Generics/messages');

require('../src/Config/connect')();

describe("testing room collection", function() {
    var room0 = "5b3028b6c800295030896ad8";
    var room1 = null;
    var room2 = null;
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
      Room.create("F201", 25).then(function(res){;room1 = res.content; assert(res.code === msg.ROOM_REGISTER); done();});
    });
    
    it("saves a record on the database", function(done) {
      Room.create("F202", 50).then(function(res){room2 = res.content;  assert(res.code === msg.ROOM_REGISTER); done();});
    });
    
    it("saves the same record on the database and fails", function(done) {
      Room.create("F201", 25).then(function(res){}).catch((res)=>{assert(res.code === msg.ROOM_EXISTS);done();});
    });

    it("lists the records on the database", function(done) {
      Room.list().then(function(res){assert(res.content.length === 2 && room1 == res.content[0]._id.toString() && room2 == res.content[1]._id.toString());done();});
    });

    it("reads the first room", function(done){
      Room.get(room1).then(function(res){assert(res.code == msg.ROOM_FETCH && res.content.name == "F201"); done();})
    })

    it("reads the first room", function(done){
      Room.get(room2).then(function(res){assert(res.code == msg.ROOM_FETCH && res.content.name == "F202"); done();})
    })
    
    it("fails to read unknown room", function(done){
      Room.get(room0).catch(function(res){assert(res.code == msg.ROOM_NOT_EXISTS); done();})
    })

    it("updates a record on the database", function(done){
      Room.update(room1, null, 32).then(function(res){assert(res.code == msg.ROOM_UPDATED); done();});
    });

    it("updates a record on the database to the same unique value as the first one and fails", function(done){
      Room.update(room2, "F201").catch(function(res){assert(res.code == msg.ROOM_EXISTS); done();});
    });

    it("deactivates the first record", function(done){
      Room.toggle(room1).then(function(res){assert(res.code == msg.ROOM_TOGGLED); done();});
    })

    it("updates a record on the database to the same unique value as the first one successfully because it's innactive", function(done){
      Room.update(room2, "F201").then(function(res){assert(res.code == msg.ROOM_UPDATED); done();});
    });

    it("fails activating the first record", function(done){ 
      Room.toggle(room1).catch(function(res){assert(res.code == msg.ROOM_EXISTS); done();});
    })

    it("updates the second room to it's previous value", function(done){
      Room.update(room2, "F202").then(function(res){assert(res.code == msg.ROOM_UPDATED); done();});
    });
    
    it("activates the first record", function(done){
      Room.toggle(room1).then(function(res){assert(res.code == msg.ROOM_TOGGLED); done();});
    })

    it("fails to create a record on an inexisting room", function(done){
      Record.create(room0, "2019/2020").catch(function(res){assert(res.code == msg.ROOM_NOT_EXISTS); done();});
    })

    it("creates a new record for the first room", function(done){
      Record.create(room1, "2018/2019").then(function(res){record1 = res.content; assert(res.code == msg.ROOM_RECORD_REGISTER); done();})
    })

    it("creates a new record for the first room", function(done){
      Record.create(room1, "2019/2020").then(function(res){record2 = res.content; assert(res.code == msg.ROOM_RECORD_REGISTER); done();})
    })

    it("fails to create a new record for the first room", function(done){
      Record.create(room1, "2018/2019").catch(function(res){assert(res.code == msg.ROOM_RECORD_EXISTS); done();})
    })

    it("lists the records on the database", function(done) {
      Record.list(room1).then(function(res){assert(res.content.length === 2 && record1 == res.content[0]._id.toString() && record2 == res.content[1]._id.toString());done();});
    });

    it("reads the first record", function(done){
      Record.get(room1, record1).then(function(res){assert(res.code == msg.ROOM_RECORD_FETCH && res.content.year == "2018/2019"); done();})
    })

    it("reads the first record", function(done){
      Record.get(room1, record2).then(function(res){assert(res.code == msg.ROOM_RECORD_FETCH && res.content.year == "2019/2020"); done();})
    })
    
    it("fails to read unknown record", function(done){
      Record.get(room1, record0).catch(function(res){assert(res.code == msg.ROOM_RECORD_NOT_EXIST); done();})
    })

    it("updates a record on the database to the same unique value as the first one and fails", function(done){
      Record.update(room1, record2, "2018/2019").catch(function(res){assert(res.code == msg.ROOM_RECORD_EXISTS); done();});
    });

    it("deactivates the first record", function(done){
      Record.toggle(room1, record1).then(function(res){assert(res.code == msg.ROOM_RECORD_TOGGLED); done();});
    })

    it("updates a record on the database to the same unique value as the first one successfully because it's innactive", function(done){
      Record.update(room1, record2, "2018/2019").then(function(res){assert(res.code == msg.ROOM_RECORD_UPDATED); done();});
    });

    it("fails activating the first record", function(done){ 
      Record.toggle(room1, record1).catch(function(res){assert(res.code == msg.ROOM_RECORD_EXISTS); done();});
    })

    it("updates the second record to it's previous value", function(done){
      Record.update(room1, record2, "2019/2020").then(function(res){assert(res.code == msg.ROOM_RECORD_UPDATED); done();});
    });
    
    it("activates the first record", function(done){
      Record.toggle(room1, record1).then(function(res){assert(res.code == msg.ROOM_RECORD_TOGGLED); done();});
    })

    it("fails to create a test on an inexisting room", function(done){
        Test.create(room0, record0, 2133).catch(function(res){ assert(res.code == msg.ROOM_NOT_EXISTS); done();});
    })
  
    it("fails to create a test on an inexisting record", function(done){
      Test.create(room1, record0, 2133).catch(function(res){assert(res.code == msg.ROOM_RECORD_NOT_EXISTS); done();});
    })
    
    it("creates a new test for the first room's first record", function(done){
      Test.create(room1, record1, 2133).then(function(res){test1 = res.content; assert(res.code == msg.ROOM_TEST_REGISTER); done();})
    })

    it("creates a new test for the first room's first record", function(done){
      Test.create(room1, record1, 2134).then(function(res){test2 = res.content; assert(res.code == msg.ROOM_TEST_REGISTER); done();})
    })

    it("fails to create a new record for the first room", function(done){
     Test.create(room1, record1, 2133).catch(function(res){assert(res.code == msg.ROOM_TEST_EXISTS); done();})
    })

    it("lists the tests on the first record", function(done) {
      Test.list(room1, record1).then(function(res){assert(res.content.length === 2 && test1 == res.content[0]._id.toString() && test2 == res.content[1]._id.toString());done();});
    });

    it("reads the first test", function(done){
      Test.get(room1, record1, test1).then(function(res){assert(res.code == msg.ROOM_TEST_FETCH && res.content.testId == '2133'); done();})
    })

    it("reads the second test", function(done){
      Test.get(room1, record1, test2).then(function(res){assert(res.code == msg.ROOM_TEST_FETCH && res.content.testId == '2134'); done();})
    })
    
    it("fails to read unknown test", function(done){
        Test.get(room1, record1, test0).catch(function(res){assert(res.code == msg.ROOM_TEST_NOT_EXISTS); done();})
    })

    it("updates a test on the database to the same unique value as the first one and fails", function(done){
        Test.update(room1, record1, test2, 2133).catch(function(res){assert(res.code == msg.ROOM_TEST_EXISTS); done();});
    });

    it("deactivates the first test", function(done){
        Test.toggle(room1, record1, test1).then(function(res){assert(res.code == msg.ROOM_TEST_TOGGLED); done();});
    })

    it("updates a test on the database to the same unique value as the first one successfully because it's innactive", function(done){
    Test.update(room1, record1, test2, 2133).then(function(res){assert(res.code == msg.ROOM_TEST_UPDATED); done();});
    });

    it("fails activating the first test", function(done){ 
        Test.toggle(room1, record1, test1).catch(function(res){assert(res.code == msg.ROOM_TEST_EXISTS); done();});
    })

    it("updates the second record to it's previous value", function(done){
        Test.update(room1, record1,test2, 2134).then(function(res){assert(res.code == msg.ROOM_TEST_UPDATED); done();});
    });
    it("activates the first record", function(done){
        Test.toggle(room1, record1, test1).then(function(res){assert(res.code == msg.ROOM_TEST_TOGGLED); done();});
    })
  

});