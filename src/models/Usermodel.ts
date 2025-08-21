const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },

    lastName: {
      type: String,
      require: true,
    },
    phonenumber: {
      type: String,
      require: true,
    },
    Email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    Isadmin: {
      type: String,
      require: false,
    },
    role: {
      type: String,
      require: false,
    },
    favouritemeal: {
      type: String,
      require: true,
    },
  },

  {
    timestamp: true,
  }
);
UserSchema.pre("save", async function (next: any) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("User", UserSchema);
