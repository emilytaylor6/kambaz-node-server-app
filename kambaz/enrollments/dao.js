import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((e) => e.user === userId);
  }

  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }

  function unenrollUserInCourse(userId, courseId) { 
    const { enrollments } = db;
    db.enrollments = enrollments.filter((enrollment) => !(enrollment.user === userId && enrollment.course === courseId));
  }
  
  return { findEnrollmentsForUser, enrollUserInCourse, unenrollUserInCourse };
}
