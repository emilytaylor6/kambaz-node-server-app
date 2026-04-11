import EnrollmentsDao from "../enrollments/dao.js";

export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  const findEnrollmentsForUser = async (req, res) => {
    const { userId } = req.params;
    const enrollments = await dao.findCoursesForUser(userId);
    res.json(enrollments);
  };

  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await dao.findUsersForCourse(cid);
    res.json(users);
  }

  const enrollUserInCourse = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const status = await dao.enrollUserInCourse(userId, courseId);
    res.send(status);
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const status = await dao.unenrollUserInCourse(userId, courseId);
    res.send(status);
  };

  app.get("/api/courses/:cid/users", findUsersForCourse);
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
}
