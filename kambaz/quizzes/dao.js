import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizzesDao() {
    // largely pulled from code relating to assignments that was completed
    // for previous assignments in the course

    /**
     * finds all quizzes associated with the given course in the database
     * @param courseId the id of the course
     * @returns the quizzes for the given course
     */
    async function findQuizzesForCourse(courseId) {
        return await model.find({ course: courseId });
    }

    /**
     * creates a quiz in the database
     * @param quiz the quiz object propagated with its fields to be added to the database
     * @returns the created quiz object
     */
    async function createQuiz(quiz) {
        const newQuiz = { ...quiz, _id: uuidv4() };
        return await model.create(newQuiz);
    }

    /**
     * deletes a quiz in the database 
     * @param quizId the quiz id in the database to be deleted
     * @returns the deleted quiz
     */
    async function deleteQuiz(quizId) {
        return await model.deleteOne({ _id: quizId });
    }

    /**
     * updates a quiz in the database with the given changes
     * @param quizId the quiz id in the database to update 
     * @param quizUpdates the fields of the quiz to be updated
     * @returns the updated quiz 
     */
    async function updateQuiz(quizId, quizUpdates) {
        return await model.updateOne({ _id: quizId }, { $set: quizUpdates });
    }

    /**
     * handles deleting all quizzes for the given course
     * @param courseId the course if for all quizzes to be deleted
     * @returns all quizzes deleted in the given course
     */
    async function deleteAllQuizzesForCourse(courseId) {
        return await model.deleteMany({ course: courseId });
    }

    /**
     * increases the question count of the given quiz by one
     * @param quizId the given quiz id
     * @returns the quiz with the increased question count
     */
    async function incQuestionCount(quizId) {
        return await model.updateOne({ _id: quizId }, { $inc: { questionCount : 1 } });
    }

    /**
     * decreases the question count of the given quiz by one
     * @param quizId the given quiz id
     * @returns the quiz with the decreased question count
     */
    async function decQuestionCount(quizId) {
        return await model.updateOne({ _id: quizId }, { $inc: { questionCount : -1 } });
    }

    return { 
        findQuizzesForCourse, 
        createQuiz, 
        deleteQuiz,
        updateQuiz,
        deleteAllQuizzesForCourse,
        incQuestionCount,
        decQuestionCount,
    };
}