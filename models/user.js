const { createHmac, randomBytes } = require("node:crypto");
const { Schema, model } = require("mongoose");
const { createTokenForUser } = require("../services/authentication.service");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/user-icon.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  //this basically is pointing current user
  const user = this;
  if (!user.isModified("password")) return;

  // make a random 16 digit key which will be used to hash using sha256 hashing technique
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const salt = "SomeRandomSalt";
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .then("hex");

    if (hashedPassword !== userProvidedHash)
      throw new Error("Incorrect Password");

    //This function now returns a JWT Token
    const token = createTokenForUser(user);
    return token;
  }
);

const User = model("user", userSchema);

module.exports = User;
