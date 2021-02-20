const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");
const UserSchema = mongoose.Schema(
  {
    uid: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(validator);

const Auth = mongoose.model("user", UserSchema);

module.exports = Auth;
