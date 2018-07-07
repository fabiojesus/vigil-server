const Mutations = require('../Actions/Mutations');
const Queries = require('../Actions/Queries');

function resolvers(){
    return{
        rooms:      (args) => {return Queries.rooms(args.token)},
        room:       (args) => {return Queries.room(args.token, args.id)},
        subjects:   (args) => {return Queries.subjects(args.token)},
        subject:    (args) => {return Queries.subject(args.token, args.id)},
        examiners:  (args) => {return Queries.examiners(args.token)},
        examiner:   (args) => {return Queries.examiner(args.token, args.id)},
        examinees:  (args) => {return Queries.examinees(args.token)},
        examinee:   (args) => {return Queries.examinee(args.token, args.id)},

        login: (args) => {return Mutations.login(args.email,args.password)},
        logout:(args) => {return Mutations.logout(args.token)},
        registerRoom: (args) => {return Mutations.registerRoom(args.token, args.name, args.seats)}, 
        registerSubject: (args) => {return Mutations.registerSubject(args.token, args.name, args.field)},
        registerTest: (args) => {return Mutations.registerTest(args.token, args.dateStart, args.dateEnd, args.dateLimit, args.subjectId, args.type)},
        registerExaminee: (args) => {return Mutations.registerExaminee(args.token, args.name, args.identification, args.email)},
        registerExaminer: (args) => {return Mutations.registerExaminer(args.token, args.name, args.identification, args.email, args.course, args.studentNumber)},
        registerCurrentRoomRecord: (args)=>{return Mutations.registerCurrentRoomRecord(args.token, args.id)},
        registerCurrentSubjectRecord: (args)=>{return Mutations.registerCurrentSubjectRecord(args.token, args.id)}
        /*
        updateRoom: (args) => {return Actions.updateRoom(args.token, args.id, args.name, args.seats)},
        toggleRoom: (args) => {return Actions.toggleRoom(args.token, args.id)},
        registerCurrentRoomRecord: (args) => {return Actions.registerCurrentRoomRecord(args.token, args.id)},
        updateSubject: (args) => {return Actions.updateSubject(args.token, args.id, args.name, args.field)},
        toggleSubject: (args) => {return Actions.toggleSubject(args.token, args.id)},     
        registerCurrentSubjectRecord: (args) => {return Actions.registerCurrentSubjectRecord(args)},
        addRoomToTest: (args) => {return Actions.addRoomToTest(args.testId, args.roomId)},
        addExaminerToTest: (args) => {return Actions.addExaminerToTest(args.testId, args.examinerId)},
        addExamineeToTest: (args) => {return Actions.addExamineeToTest(args.testId, args.examineeId)},
        setExaminerToRoom: (args) => {return Actions.setExaminerToRoom(args.testId, args.examinerId, args.roomId)},
        setExamineeToRoom: (args) => {return Actions.setExamineeToRoom(args.testId, args.examineeId, args.roomId, args.seats)},
*/
    }
}



module.exports = resolvers();