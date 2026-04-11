import mongoose from "mongoose";
import moduleSchema from "../modules/schema.js";

const courseSchema = new mongoose.Schema({
   _id: String,
   name: String,
   number: String,
   startDate: Date,
   endDate: Date,
   department: String,
   credits: Number,
   description: String,
   image: String,
   modules: [moduleSchema],
 },
 { collection: "courses" }
);
export default courseSchema;