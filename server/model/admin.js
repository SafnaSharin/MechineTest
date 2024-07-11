const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminschema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: true },
  id: { type: Number, required: false },
  tokens: { type: String, default: "" }
});

adminschema.pre("save", async function (next) {
  if (this.isModified('password') || this.isNew) {
    if (!this.password.startsWith('$2b$')) {
      try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
      } catch (err) {
        console.log(err.message, "something went wrong in password hashing");
        return next(err);
      }
    } else {
      console.log("Password is already hashed.");
      return next();
    }
  } else {
    console.log("Password is not modified.");
    return next();
  }
});

const adminModel = mongoose.model('adminModel', adminschema);
module.exports = adminModel;