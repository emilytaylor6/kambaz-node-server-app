import QuestionsDao from "./dao.js";

export default function QuestionsRoutes(app) {
    // largely pulled from code relating to assignments that was completed
    // for previous assignments in the course

    const dao = QuestionsDao();

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
        res.send(newQuestion);
    }

    /**
     * deletes a question from the quiz
     */
    const deleteQuestion = async (req, res) => {
        const { questionId } = req.params;
        const status = await dao.deleteQuestion(questionId);
        res.send(status);
    }

    /**
     * updates a question for the quiz
     */
    const updateQuestion = async (req, res) => {
        const { questionId } = req.params;
        const questionUpdates = req.body;
        const status = await dao.updateQuestion(questionId, questionUpdates);
        res.send(status);
    }

    app.post("/api/quizzes/:quizId/question", createQuestionForQuiz);
    app.get("/api/quizzes/:quizId/question", findQuestionsForQuiz);
    app.delete("/api/quizzes/:quizId/question/:questionId", deleteQuestion);
    app.put("/api/quizzes/:quizId/question/:questionId", updateQuestion);
}