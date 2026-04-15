import QuizzesDao from "../quizzes/dao.js";
import QuestionsDao from "./dao.js";

export default function QuestionsRoutes(app) {
    // largely pulled from code relating to assignments that was completed
    // for previous assignments in the course

    const dao = QuestionsDao();
    const quizzesDao = QuizzesDao();

    /**
     * finds all the questions for a quiz 
     */
    const findQuestionsForQuiz = async (req, res) => {
        const { quizId } = req.params;
        const questions = await dao.findQuestionsForQuiz(quizId);
        res.json(questions);
    }

    /**
     * creates a question for the quiz
     */
    const createQuestionForQuiz = async (req, res) => {
        const { quizId } = req.params;
        const question = {
        ...req.body,
        quiz: quizId,
        };
        const newQuestion = await dao.createQuestion(question);
        await quizzesDao.incQuestionCount(quizId);
        await quizzesDao.addPointsToQuiz(quizId, question.points);
        res.send(newQuestion);
    }

    /**
     * deletes a question from the quiz
     */
    const deleteQuestion = async (req, res) => {
        const { questionId } = req.params;
        const question = await dao.findQuestionById(questionId);
        const status = await dao.deleteQuestion(questionId);
        await quizzesDao.decQuestionCount(question.quiz);
        await quizzesDao.removePointsFromQuiz(question.quiz, question.points);
        res.send(status);
    }

    /**
     * updates a question for the quiz
     */
    const updateQuestion = async (req, res) => {
        const { questionId } = req.params;
        const questionUpdates = req.body;

        const oldQuestion = await dao.findQuestionById(questionId);
        const status = await dao.updateQuestion(questionId, questionUpdates);

        if (questionUpdates.points !== undefined && questionUpdates.points !== oldQuestion.points) {
            const pointDifference = questionUpdates.points - oldQuestion.points;
            if (pointDifference > 0) {
                await quizzesDao.addPointsToQuiz(oldQuestion.quiz, pointDifference);
            } else {
                await quizzesDao.removePointsFromQuiz(oldQuestion.quiz, Math.abs(pointDifference))
            }
        }
        res.send(status);
    }

    app.post("/api/quizzes/:quizId/questions", createQuestionForQuiz);
    app.get("/api/quizzes/:quizId/questions", findQuestionsForQuiz);
    app.delete("/api/questions/:questionId", deleteQuestion);
    app.put("/api/questions/:questionId", updateQuestion);
}