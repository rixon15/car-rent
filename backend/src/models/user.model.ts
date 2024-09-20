import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  phoneNumber: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Pick<UserDocument, "_id" | "verified" | "createdAt" | "__v">;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return null;
  }

  this.password = await hashValue(this.password, 8);
  next();
});

userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
