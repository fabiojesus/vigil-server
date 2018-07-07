const buildSchema = require('graphql').buildSchema;


function schema(){
    return buildSchema(`

        type LoginResult{
            code:String!
            token:String
        }

        type LogoutResult{
            code:String!
        }

        type IDResult{
            code:String!
            content:String
        }

        type RecordTest{
            testId: String!
            active: Boolean
        }

        type RecordTestResult{
            code:String!
            content: RecordTest
        }
        
        type RecordTestsResult{
            code:String!
            content: [RecordTest]
        }
        
        type Record{
            id:String
            year:String
            active:Boolean
            tests:[RecordTest]
        }

        type RecordResult{
            code: String!
            content: Record
        }

        type RecordsResult{
            code:String!
            content:[Record]
        }

        type ExamineeRecord{
            id:String!
            year:String
            course:String
            studentNumber:String
            tests: [RecordTest]
        }

        type ExamineeRecordResult{
            code:String
            content:ExamineeRecord
        }

        type ExamineesRecordResult{
            code:String
            content:[ExamineeRecord]
        }

        type Subject{
            id:String
            name:String
            field:String
            records:[Record]
        }

        type SubjectResult{
            code:String
            content:Subject
        }
        
        type SubjectsResult{
            code:String
            content:[Subject]
        }

        type Room{
            id:String
            name:String
            seats:Int
            records:[Record]
        }

        type RoomResult{
            code:String
            content:Room
        }
        
        type RoomsResult{
            code:String
            content:[Room]
        }

        type Examinee{
            id:String
            name:String
            identification:String
            records:[ExamineeRecord]
        }

        type ExamineeResult{
            code:String
            content:Examinee
        }
        
        type ExamineesResult{
            code:String
            content:[Examinee]
        }

        type Examiner{
            id:String
            name:String
            identification:String
            records:[Record]
        }
        
        type ExaminerResult{
            code:String
            content:Examiner
        }
        
        type ExaminersResult{
            code:String
            content:[Examiner]
        }
        
        type TestExaminee{
            active:Boolean
            examineeId: String
            roomId: String
            seat: Int
            registered: Boolean
            sheetNumber: Int
            presence: String
        }

        type TestExaminer{
            examinerId: String
            roomId: String
            active:Boolean
        }

        type TestRoom{
            roomId: String
            active:Boolean
        }

        type Test{
            year: String
            confirmationDate:String
            dateStart: String
            dateEnd: String
            subjectId: String
            type: String
            active: Boolean
            rooms: [TestRoom]
            examinees: [TestExaminee]
            examiners: [TestExaminer]
        }

        type TestResult{
            code:String
            content:Test
        }
        
        type TestsResult{
            code:String
            content:[Test]
        }
 
        type Query{
            subjects(token:String!): SubjectsResult
            rooms(token:String!): RoomsResult
            tests(token:String!): TestsResult
            examinees(token:String!):ExamineesResult
            examiners(token:String!): ExaminersResult
            subject(token:String! id:String!): SubjectResult
            room(token:String! id:String!):RoomResult
            test(token:String! id:String!): TestResult
            examinee(token:String! id:String!):ExamineeResult
            examiner(token:String! id:String!):ExaminerResult
        }

        type Mutation{
            login(email:String! password:String!):LoginResult
            logout(token:String!):LogoutResult
            registerRoom(token:String! name:String! seats:Int!):IDResult
            registerSubject(token:String! name:String! field:String!):IDResult
            registerExaminee(token:String! name:String! identification:String! email:String! course:String! studentNumber:String!):IDResult
            registerExaminer(token:String! name:String! identification:String! email:String!):IDResult
            registerTest(token:String!  dateStart:String! dateEnd:String! dateLimit:String! subjectId:String! type:String!):IDResult
            renewExamineeRecord(token:String! id:String!):IDResult
            registerCurrentRoomRecord(token:String! id:String!):IDResult
            registerCurrentSubjectRecord(token:String! id:String!):IDResult
            registerCurrentExaminerRecord(token:String! id:String!):IDResult
            registerCurrentExamineeRecord(token:String! id:String! course:String! studentNumber:String!):IDResult
            updateRoom(token:String! id:String! name:String seats:Int):IDResult
            updateSubject(token:String! id:String! name:String field:String):IDResult
            updateExaminer(token:String! id:String! name:String identification:String):IDResult
            updateExaminee(token:String! id:String! name:String identification:String):IDResult
            updateExaminerRecord(token:String! id:String! recordId:String! course:String studentNumber:String):IDResult
            deleteRoom(token:String! id:String!):IDResult
            deleteSubject(token:String! id:String!):IDResult
            addRoomToTest(token:String! id:String! roomId:String!):IDResult
            setExaminerToTestRoom(token:String! id:String! roomId:String! examinerId:String!):IDResult
            setExamineeToTestRoom(token:String! id:String! examineeId:String! roomId:String! seat:Int):IDResult
            confirmPresence(token:String! id:String! examineeId:String!):IDResult
            checkIn(token:String! id:String! examineeId:String! sheetNumber:String!):IDResult
        }
    `);
}

module.exports = schema();