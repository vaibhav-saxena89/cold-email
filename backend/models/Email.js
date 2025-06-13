import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  name: String,
  jobURL: String,
  skills: String,
  experience: String,
  emailText: String,
}, { timestamps: true });

export default mongoose.model("Email", emailSchema);
