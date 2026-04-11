import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao() {
    async function findAssignmentsForCourse(courseId) {
        return await model.find({ course: courseId });
    }

    async function createAssignment(assignment) {
        const newAssignment = { ...assignment, _id: uuidv4() };
        return await model.create(newAssignment);
    }

    async function deleteAssignment(assignmentId) {
        return await model.deleteOne({ _id: assignmentId });
    }

    function updateAssignment(assignmentId, assignmentUpdates) {
        return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
    }

    function deleteAllAssignmentsForCourse(courseId) {
        return model.deleteMany({ course: courseId });
    }

    return { 
        findAssignmentsForCourse, 
        createAssignment, 
        deleteAssignment, 
        updateAssignment, 
        deleteAllAssignmentsForCourse,
    };
}
