const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestExaminerSchema = new Schema({
    examinerId: String,
    roomId: String,
    active:Boolean,
});

const TestExamineeSchema = new Schema({
    active:Boolean,
    examineeId: String,
    roomId: String,
    seat: Number,
    registered: Boolean,
    sheetNumber: Number,
    presence: String
});

const TestRoomSchema = new Schema({
    roomId: String,
    active:Boolean
});

const TestSchema = new Schema({
    year: String,
    confirmationDate:String,
    dateStart: String,
    dateEnd: String,
    subjectId: String,
    type: String,
    active: Boolean,
    rooms: [TestRoomSchema],
    examinees: [TestExamineeSchema],
    examiners: [TestExaminerSchema]
});


const TestModel = mongoose.model('Test', TestSchema);
const RoomModel = mongoose.model("TestRoom", TestRoomSchema);
const ExamineeModel = mongoose.model('TestExaminee', TestExamineeSchema);
const ExaminerModel = mongoose.model('TestExaminer', TestExaminerSchema);

module.exports = {
    Test:TestModel,
    Room:RoomModel,
    Examiner:ExaminerModel,
    Examinee:ExamineeModel
}