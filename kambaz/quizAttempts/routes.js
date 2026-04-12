import QuizAttemptsDao from "./dao.js";

export default function QuizAttemptsRoutes(app) {
    // largely pulled from code relating to assignments that was completed
    // for previous assignments in the course

    const dao = QuizAttemptsDao();

    /**
     * finds all the attempts for a quiz 
     */
    const findAttemptsForQuiz = async (req, res) => {
        const { quizId } = req.params;
        const attempts = await dao.findAttemptsForQuiz(quizId);
        res.json(attempts);
    }

    /**
     * finds all the attempts for a user 
     */
    const findAttemptsForUser = async (req, res) => {
        const { userId } = req.params;
        const attempts = await dao.findAttemptsForUser(userId);
        res.json(attempts);
    }

    /**
     * creates an attempt for the quiz
     */
    const createAttemptForQuiz = async (req, res) => {
        const { quizId } = req.params;
        const attempt = {
        ...req.body,
        quiz: quizId,
        };
        const newAttempt = await dao.createAttempt(attempt);
        res.send(newAttempt);
    }

    /**
     * deletes an attempt from the quiz
     */
    const deleteAttempt = async (req, res) => {
        const { attemptId } = req.params;
        const status = await dao.deleteAttempt(attemptId);
        res.send(status);
    }

    /**
     * updates an attempt for the quiz
     */
    const updateAttempt = async (req, res) => {
        const { attemptId } = req.params;
        const attemptUpdates = req.body;
        const status = await dao.updateAttempt(attemptId, attemptUpdates);
        res.send(status);
    }

    app.post("/api/quizzes/:quizId/attempts", createAttemptForQuiz);
    app.get("/api/quizzes/:quizId/attempts", findAttemptsForQuiz);
    app.get("/api/quizzes/:quizId/attempts/:userId", findAttemptsForUser);
    app.delete("/api/quizzes/:quizId/attempts/:attemptId", deleteAttempt);
    app.put("/api/quizzes/:quizId/attempts/:attemptId", updateAttempt);
}