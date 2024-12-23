import { Router } from "express";
import studentController from "../controller/students.controller.js";

const studentRouter = Router();

const StudentController = new studentController();

studentRouter.get("/students", (req, res) => StudentController.getStudentsController(req, res));
studentRouter.get("/students/:id", (req, res) => StudentController.getStudentController(req, res));
studentRouter.post("/students", (req, res) => StudentController.createStudentController(req, res));
studentRouter.post("/students/:studentId/groups", (req, res) => StudentController.joinGroupController(req, res));
studentRouter.put("/students/:id", (req, res) => StudentController.updateStudentController(req, res));
studentRouter.delete("/students/:id", (req, res) => StudentController.deleteStudentController(req, res));

export default studentRouter;
