import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
    // all questions
   _id: String,
   quiz: { type: String, ref: "QuizzesModel" },
   type: { 
    type: String, 
    enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_THE_BLANK"],
    default: "MULTIPLE_CHOICE", 
    },
   title: String,
   points: Number, 
   question: String,
   
   // multiple choice
   multipleChoiceAnswers: [{ choice: String, isCorrect: Boolean }], 

   // true false
   trueFalseAnswer: { type: String, enum: ["true", "false"]},
   
   // fill in
   fillInAnswers: [String],
 },
 { collection: "questions" }
);
export default questionsSchema;