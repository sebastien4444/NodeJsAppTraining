const dbLocal = require("db-local");
const { Schema } = new dbLocal({ path: "./databases" });
const crypto = require("crypto");

const UserModelName = "User"
const UserBaseModel = {
    _id: { type: Number },
    username:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:false},
    createdAt:{type:Date, default:Date.now}
}

const userSchema = Schema(UserModelName,UserBaseModel);

const generateUniqueID = function() {
    return crypto.randomBytes(8).toString('hex')
  }

module.exports = userSchema, generateUniqueID;