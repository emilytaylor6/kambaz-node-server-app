import mongoose from "mongoose";

const quizAttemptsSchema = new mongoose.Schema({
   _id: String,
   quiz: { type: String, ref: "CourseModel" },
   user: { type: String, ref: "UserModel" },
   score: Number,
   submittedAt: Date,

   answers: [{
    question: { type: String, ref: "QuestionsModel"},
    questionAnswer: String, 
    isCorrect: Boolean,
   }],
 },
 { collection: "quizAttempts" }
);
export default quizAttemptsSchema;