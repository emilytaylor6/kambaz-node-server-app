import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
    // largely pulled from code relating to assignments that was completed
    // for previous assignments in the course

    const dao = QuizzesDao();

    /**
     * finds all the quizzes for a course 
     */
    const findQuizzesForCourse = async (req, res) => {
        const { courseId } = req.params;
        const quizzes = await dao.findQuizzesForCourse(courseId);
        res.json(quizzes);
    }

    /**
     * creates a quiz for the course
     */
    const createQuizForCourse = async (req, res) => {
        const { courseId } = req.params;
        const quiz = {
        ...req.body,
        course: courseId,
        };
        const newQuiz = await dao.createQuiz(quiz);
        res.send(newQuiz);
    }

  /**
   * deletes a quiz from the course
   */
    const deleteQuiz = async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.deleteQuiz(quizId);
        res.send(status);
    }

    /**
     * updates a quiz for the course
     */
    const updateQuiz = async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status = await dao.updateQuiz(quizId, quizUpdates);
        res.send(status);
    }

    app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
    app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
    app.delete("/api/quizzes/:quizId", deleteQuiz);
    app.put("/api/quizzes/:quizId", updateQuiz);
}