
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordTestSchema = new Schema({
    testId: String,
    isDeleted: Boolean
});

const ExamineeRecordSchema = new Schema({
    year: String,
    course: String,
    studentNumber: String,
    isDeleted: Boolean,
    tests: [RecordTestSchema]
});

const ExamineeSchema = new Schema({
    name: String,
    identification: String,
    isDeleted: Boolean,
    records: [ExamineeRecordSchema]
});


const ExamineeModel = mongoose.model('Examinee', ExamineeSchema);
const RecordModel = mongoose.model("ExamineeRecord", ExamineeRecordSchema);
const TestModel = mongoose.model("ExamineeTest", RecordTestSchema);

module.exports = {
    Examinee:ExamineeModel,
    Record:RecordModel,
    Test:TestModel,
}