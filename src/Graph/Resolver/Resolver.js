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
        registerExaminee: (args) => {return Mutations.registerExaminee(args.token, args.name, args.identification, args.email)},
        registerExaminer: (args) => {return Mutations.registerExaminer(args.token, args.name, args.identification, args.email, args.course, args.studentNumber)},
        registerTest: (args) => {return Mutations.registerTest(args.token, args.dateStart, args.dateEnd, args.dateLimit, args.subjectId, args.type)},
        registerCurrentRoomRecord: (args)=>{return Mutations.registerCurrentRoomRecord(args.token, args.id)},
        registerCurrentSubjectRecord: (args)=>{return Mutations.registerCurrentSubjectRecord(args.token, args.id)},
        registerCurrentExamineeRecord: (args)=>{return Mutations.registerCurrentExamineeRecord(args.token, args.id, args.course, args.studentNumber)},
        registerCurrentExaminerRecord: (args)=>{return Mutations.registerCurrentExaminerRecord(args.token, args.id)},
        renewExamineeRecord: (args)=> {return Mutations.renewExamineeRecord(args.token, args.id)},
        updateRoom: (args) => {return Mutations.updateRoom(args.token, args.id, args.name, args.seats)},
        updateSubject: (args) => {return Mutations.updateSubject(args.token, args.id, args.name, args.field)},
        updateExaminer: (args) => {return Mutations.updateExaminer(args.token, args.id, args.identification, args.name)},
        updateExaminee: (args) => {return Mutations.updateExaminee(args.token, args.id, args.identification, args.name)},
        updateExaminerRecord: (args) => {return Mutations.updateExamineeRecord(args.token, args.id, args.recordId, args.course, args.studentNumber)},
        deleteRoom: (args) => {return Mutations.deleteRoom(args.token, args.id)},
        deleteSubject: (args) => {return Mutations.deleteSubject(args.token, args.id)},
        addRoomToTest: (args) => {return Mutations.addRoomToTest(args.token, args.id, args.roomId)},
        addExamineeToTest: (args) => {return Mutations.addExamineeToTest(args.token, args.id, args.examineeId)},
        addExaminerToTest: (args) => {return Mutations.addExaminerToTest(args.token, args.id, args.examinerId)},
        setExaminerToTestRoom: (args) => {return Mutations.setExaminerToTestRoom(args.token, args.id, args.roomId, args.examinerId)},
        setExamineeToTestRoom: (args) => {return Mutations.setExamineeToTestRoom(args.token, args.id, args.examineeId, args.roomId, args.seat)},
        confirmPresence: (args) => {return Mutations.confirmPresence(args.token, args.id, args.examineeId)},
        checkIn: (args) => {return Mutations.checkIn(args.token, args.id, args.examineeId, args.sheetNumber)}
    }
}



module.exports = resolvers();