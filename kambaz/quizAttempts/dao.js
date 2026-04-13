import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizAttemptsDao() {
    // largely pulled from code relating to assignments that was completed
    // for previous assignments in the course

    /**
     * finds all attempts associated with the given quiz in the database
     * @param quizId the id of the quiz
     * @returns the attempts for the given quiz
     */
    async function findAttemptsForQuiz(quizId) {
        return await model.find({ quiz: quizId });
    }

    /**
     * finds all attempts associated with the given user in the database
     * @param userId the id of the user
     * @returns the attempts for the given user
     */
    async function findAttemptsForUser(userId) {
        return await model.find({ quiz: quizId, user: userId });
    }

    /**
     * creates an attempt in the database
     * @param attempt the attempt object propagated with its fields to be added to the database
     * @returns the created attempt object
     */
    async function createAttempt(attempt) {
        const newAttempt = { ...attempt, _id: uuidv4() };
        return await model.create(newAttempt);
    }

    /**
     * deletes an attempt in the database 
     * @param attemptId the attempt id in the database to be deleted
     * @returns the deleted attempt
     */
    async function deleteAttempt(attemptId) {
        return await model.deleteOne({ _id: attemptId });
    }

    /**
     * updates an attempt in the database with the given changes
     * @param attemptId the attempt id in the database to update 
     * @param attemptUpdates the fields of the attempt to be updated
     * @returns the updated attempt 
     */
    function updateAttempt(questionId, questionUpdates) {
        return model.updateOne({ _id: questionId }, { $set: questionUpdates });
    }

    /**
     * handles deleting all attempts for the given quiz
     * @param quizId the quiz id for all attempts to be deleted
     * @returns all attempts deleted in the given course
     */
    function deleteAllAttemptsForQuiz(quizId) {
        return model.deleteMany({ quiz: quizId });
    }

    return { 
        findAttemptsForQuiz, 
        findAttemptsForUser,
        createAttempt, 
        deleteAttempt,
        updateAttempt,
        deleteAllAttemptsForQuiz,
    };
}