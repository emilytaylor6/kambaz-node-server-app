import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
   _id: String,
   title: String,
   description: String,
   course: String,
   availableDate: Date,
   dueDate: Date,
   untilDate: Date,
   givenPoints: Number,
   totalPoints: Number,
 },
 { collection: "assignments" }
);
export default assignmentSchema;