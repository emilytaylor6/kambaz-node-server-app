import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuestionsDao() {
    // largely pulled from code relating to assignments that was completed
    // for previous assignments in the course

    /**
     * finds all questions associated with the given quiz in the database
     * @param quizId the id of the quiz
     * @returns the questions for the given quiz
     */
    async function findQuestionsForQuiz(quizId) {
        return await model.find({ quiz: quizId });
    }

    /**
     * finds the question at the given id
     * @param questionId the given question id
     * @returns the question at the given id
     */
    async function findQuestionById(questionId) {
        return await model.find(questionId);
    }

    /**
     * creates a question in the database
     * @param question the question object propagated with its fields to be added to the database
     * @returns the created question object
     */
    async function createQuestion(question) {
        const newQuestion = { ...question, _id: uuidv4() };
        return await model.create(newQuestion);
    }

    /**
     * deletes a question in the database 
     * @param questionId the question id in the database to be deleted
     * @returns the deleted question
     */
    async function deleteQuestion(questionId) {
        return await model.deleteOne({ _id: questionId });
    }

    /**
     * updates a question in the database with the given changes
     * @param questionId the question id in the database to update 
     * @param questionUpdates the fields of the question to be updated
     * @returns the updated question 
     */
    async function updateQuestion(questionId, questionUpdates) {
        return await model.updateOne({ _id: questionId }, { $set: questionUpdates });
    }

    /**
     * handles deleting all questions for the given quiz
     * @param quizId the quiz id for all questions to be deleted
     * @returns all questions deleted in the given course
     */
    async function deleteAllQuestionsForQuiz(quizId) {
        return await model.deleteMany({ quiz: quizId });
    }

    return { 
        findQuestionsForQuiz, 
        findQuestionById,
        createQuestion, 
        deleteQuestion,
        updateQuestion,
        deleteAllQuestionsForQuiz,
    };
}