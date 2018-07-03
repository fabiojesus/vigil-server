const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomRecordTestSchema = new Schema({
    testId: String,
    active: Boolean
});

const RoomRecordSchema = new Schema({
    year: String,
    active: Boolean,
    tests: [RoomRecordTestSchema]
});

const RoomSchema = new Schema({
    name: String,
    seats: Number,
    active: Boolean,
    records: [RoomRecordSchema]
});

const RoomModel = mongoose.model('Room', RoomSchema);
const RoomRecordModel = mongoose.model("RoomRecord", RoomRecordSchema);
const RoomRecordTestModel = mongoose.model('RoomTest', RoomRecordTestSchema);

module.exports = {
    Room:RoomModel,
    Record:RoomRecordModel,
    Test:RoomRecordTestModel
}