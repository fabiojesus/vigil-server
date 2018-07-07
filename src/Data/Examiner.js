const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordTestSchema = new Schema({
    testId: String,
    isDeleted: Boolean
});

const ExaminerRecordSchema = new Schema({
    year: String,
    isDeleted: Boolean,
    tests: [RecordTestSchema]
});

const ExaminerSchema = new Schema({
    name: String,
    identification: String,
    isDeleted: Boolean,
    records: [ExaminerRecordSchema]
});

const ExaminerModel = mongoose.model('Examiner', ExaminerSchema);
const RecordModel = mongoose.model("ExaminerRecord", ExaminerRecordSchema);
const RecordTestModel = mongoose.model("ExaminerTest", RecordTestSchema);

module.exports = {
    Examiner:ExaminerModel,
    Record:RecordModel,
    Test: RecordTestModel
}