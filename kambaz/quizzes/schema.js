import mongoose from "mongoose";

const quizzesSchema = new mongoose.Schema({
    _id: String,
    course: String,
    title: String,
    description: String,
    points: { type: Number, default: 0 },
    quizType: { 
        type: String,
        enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
        default: "Graded Quiz",
    },
    assignedTo: { type: String, default: "Everyone" },
    assignmentGroup: { 
        type: String, 
        enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECTS"], 
        default: "QUIZZES"
    }, 
    isShuffled: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 }, // in minutes
    hasMultipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: String, 
    isOneQuestionAtATime: { type: Boolean, default: true },
    isWebcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,

    },
    { collection: "quizzes" }
);
export default quizzesSchema;