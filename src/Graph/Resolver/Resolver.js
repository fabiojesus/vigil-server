const Mutations = require('../Actions/Mutations');
const Queries = require('../Actions/Queries');

function resolvers(){
    return{
        rooms:      (args) => {return Queries.room.rooms(args.token)},
        room:       (args) => {return Queries.room.room(args.token, args.id)},
        subjects:   (args) => {return Queries.subject.subjects(args.token)},
        subject:    (args) => {return Queries.subject.subject(args.token, args.id)},
        examiners:  (args) => {return Queries.examiner.examiners(args.token)},
        examiner:   (args) => {return Queries.examiner.examiner(args.token, args.id)},
        examinees:  (args) => {return Queries.examinee.examinees(args.token)},
        examinee:   (args) => {return Queries.examinee.examinee(args.token, args.id)},
        tests: (args) => {return Queries.test.tests(args.token)},
        test: (args) => {return Queries.test.test(args.token, args.id)},

        login: (args) => {return Mutations.account.login(args.email,args.password)},
        logout:(args) => {return Mutations.account.logout(args.token)},
        recover:(args) => {return Mutations.account.recoverPassword(args.email)},
        clear: (args) => {return Mutations.account.clearTokens(args.token)},
        changePassword: (args) => {return Mutations.account.changePassword(args.token, args.email, args.password)},

        registerRoom: (args) => {return Mutations.room.registerRoom(args.token, args.name, args.seats)}, 
        updateRoom: (args) => {return Mutations.room.updateRoom(args.token, args.id, args.name, args.seats)},
        deleteRoom: (args) => {return Mutations.room.deleteRoom(args.token, args.id)},
        registerCurrentRoomRecord: (args)=>{return Mutations.room.registerCurrentRoomRecord(args.token, args.id)},
        deleteRoomRecord: (args) => {return Mutations.room.deleteRoomRecord(args.token, args.id, args.recordId)},

        registerSubject: (args) => {return Mutations.subject.registerSubject(args.token, args.name, args.field)},
        updateSubject: (args) => {return Mutations.subject.updateSubject(args.token, args.id, args.name, args.field)},
        deleteSubject: (args) => {return Mutations.subject.deleteSubject(args.token, args.id)},
        registerCurrentSubjectRecord: (args)=>{return Mutations.subject.registerCurrentSubjectRecord(args.token, args.id)},
        deleteSubjectRecord: (args) => {return Mutations.subject.deleteSubjectRecord(args.token, args.id, args.recordId)},

        registerExaminee: (args) => {return Mutations.examinee.registerExaminee(args.token, args.name, args.identification, args.email, args.course, args.studentNumber)},
        updateExaminee: (args) => {return Mutations.examinee.updateExaminee(args.token, args.id, args.identification, args.name)},
        deleteExaminee: (args) => {return Mutations.examinee.deleteExaminee(args.token, args.examineeId)},
        registerCurrentExamineeRecord: (args)=>{return Mutations.examinee.registerCurrentExamineeRecord(args.token, args.id, args.course, args.studentNumber)},
        renewExamineeRecord: (args)=> {return Mutations.examinee.renewExamineeRecord(args.token, args.id)},
        updateExamineeRecord: (args) => {return Mutations.examinee.updateExamineeRecord(args.token, args.id, args.recordId, args.course, args.studentNumber)},
        deleteExamineeRecord: (args) => {return Mutations.examinee.deleteExamineeRecord(args.token, args.id, args.recordId)},

        registerExaminer: (args) => {return Mutations.examiner.registerExaminer(args.token, args.name, args.identification, args.email, args.course, args.studentNumber)},
        updateExaminer: (args) => {return Mutations.examiner.updateExaminer(args.token, args.id, args.identification, args.name)},
        deleteExaminer: (args) => {return Mutations.examiner.deleteExaminer(args.token, args.id)},
        registerCurrentExaminerRecord: (args)=>{return Mutations.examiner.registerCurrentExaminerRecord(args.token, args.id)},
        deleteExaminerRecord: (args) => {return Mutations.examiner.deleteExaminerRecord(args.token, args.id, args.recordId)},
    

        registerTest: (args) => {return Mutations.test.registerTest(args.token, args.dateStart, args.dateEnd, args.dateLimit, args.subjectId, args.type)},
        addRoomToTest: (args) => {return Mutations.test.addRoomToTest(args.token, args.id, args.roomId)},
        addExaminerToTest: (args) => {return Mutations.test.addExaminerToTest(args.token, args.id, args.examinerId)},
        addExamineeToTest: (args) => {return Mutations.test.addExamineeToTest(args.token, args.id, args.examineeId)},
        setExaminerToTestRoom: (args) => {return Mutations.test.setExaminerToTestRoom(args.token, args.id, args.roomId, args.examinerId)},
        setExamineeToTestRoom: (args) => {return Mutations.test.setExamineeToTestRoom(args.token, args.id, args.examineeId, args.roomId, args.seat)},
        getExamineeFull: (args) => {return Mutations.examinee.getFull(args.examineeId)},
        confirmPresence: (args) => {return Mutations.user.confirmPresence(args.token, args.id, args.examineeId)},
        checkIn: (args) => {return Mutations.user.checkIn(args.token, args.id, args.examinerId, args.examineeId, args.sheetNumber)}
    }
}

module.exports = resolvers();