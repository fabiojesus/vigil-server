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
            id:String!
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
            id:String!
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
            id:String!
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
            rooms(token:String!): RoomsResult
            room(token:String! id:String!):RoomResult
            subjects(token:String!): SubjectsResult
            subject(token:String! id:String!): SubjectResult
            examinees(token:String!):ExamineesResult
            examinee(token:String! id:String!):ExamineeResult
            examiners(token:String!): ExaminersResult
            examiner(token:String! id:String!):ExaminerResult
            tests(token:String!): TestsResult
            test(token:String! id:String!):TestResult
        }

        type Mutation{
            login(email:String! password:String!):LoginResult
            logout(token:String!):LogoutResult
            recover(email:String!):IDResult
            clear(token:String!):IDResult
            changePassword(token:String! email:String! password:String!):IDResult
            
            registerRoom(token:String! name:String! seats:Int!):IDResult
            updateRoom(token:String! id:String! name:String seats:Int):IDResult
            deleteRoom(token:String! id:String!):IDResult
            registerCurrentRoomRecord(token:String! id:String!):IDResult
            deleteRoomRecord(token:String! id:String! recordId:String!):IDResult            
            
            registerSubject(token:String! name:String! field:String!):IDResult
            updateSubject(token:String! id:String! name:String field:String):IDResult
            deleteSubject(token:String! id:String!):IDResult
            registerCurrentSubjectRecord(token:String! id:String!):IDResult
            deleteSubjectRecord(token:String! id:String! recordId:String!):IDResult            
            
            registerExaminee(token:String! name:String! identification:String! email:String! course:String! studentNumber:String!):IDResult
            updateExaminee(token:String! id:String! name:String identification:String):IDResult
            deleteExaminee(token:String! id:String!):IDResult
            registerCurrentExamineeRecord(token:String! id:String! course:String! studentNumber:String!):IDResult
            renewExamineeRecord(token:String! id:String!):IDResult
            updateExamineeRecord(token:String! id:String! recordId:String! course:String studentNumber:String):IDResult
            deleteExamineeRecord(token:String! id:String! recordId:String!):IDResult            

            registerExaminer(token:String! name:String! identification:String! email:String!):IDResult
            updateExaminer(token:String! id:String! name:String identification:String):IDResult
            deleteExaminer(token:String! id:String!):IDResult
            registerCurrentExaminerRecord(token:String! id:String!):IDResult
            deleteExaminerRecord(token:String! id:String! recordId:String!):IDResult            
            
            registerTest(token:String!  dateStart:String! dateEnd:String! dateLimit:String! subjectId:String! type:String!):IDResult
            addRoomToTest(token:String! id:String! roomId:String!):IDResult
            addExaminerToTest(token:String! id:String! examinerId:String!):IDResult
            addExamineeToTest(token:String! id:String! examineeId:String!):IDResult
            setExaminerToTestRoom(token:String! id:String! roomId:String! examinerId:String!):IDResult
            setExamineeToTestRoom(token:String! id:String! examineeId:String! roomId:String! seat:Int):IDResult
            
            confirmPresence(token:String! id:String! examineeId:String!):IDResult
            checkIn(token:String! id:String! examinerId:String! examineeId:String! sheetNumber:String!):IDResult
            getExamineeFull(examineeId:String!):IDResult
        }
    `);
}

module.exports = schema();