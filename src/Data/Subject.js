const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordTestSchema = new Schema({
    testId: String,
    active: Boolean
});

const SubjectRecordSchema = new Schema({
    year: String,
    active: Boolean,
    tests: [RecordTestSchema]
});

const SubjectSchema = new Schema({
    name: String,
    field: String,
    active: Boolean,
    records: [SubjectRecordSchema]
});

const SubjectModel = mongoose.model('Subject', SubjectSchema);
const RecordModel = mongoose.model("SubjectRecord", SubjectRecordSchema);
const RecordTestModel = mongoose.model('SubjectTest', RecordTestSchema);

module.exports = {
    Subject:SubjectModel,
    Record:RecordModel,
    Test:RecordTestModel
}