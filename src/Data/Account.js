const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    profileId: String,
    email:String,
    password:String,
    role:String,
    active:Boolean
});

const TokenSchema = new Schema({
    token:String
})

const AccountModel = mongoose.model('Account', AccountSchema);
const TokenModel = mongoose.model('Token', TokenSchema);
module.exports = {
    Account:AccountModel,
    Token:TokenModel
}