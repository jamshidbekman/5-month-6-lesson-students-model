import studentService from "../service/students.service.js";

class studentController {
  constructor() {
    this.studentService = new studentService();
  }
  async getStudentsController(req, res) {
    try {
      const students = await this.studentService.getStudents();
      res.statusCode = 200;
      res.send(students);
    } catch (error) {
      res.statusCode = 400;
      res.send({
        message: error.message,
      });
    }
  }
  async getStudentController(req, res) {
    try {
      const { id } = req.params;
      const data = await this.studentService.getStudent(id);
      res.statusCode = 200;
      res.send(data);
    } catch (error) {
      if (error.message === "student-not-found") {
        res.statusCode = 404;
        res.send({
          message: "Student not found",
        });
      } else {
        res.statusCode = 400;
        res.send({
          message: error.message,
        });
      }
    }
  }
  async createStudentController(req, res) {
    try {
      const body = req.body;
      const data = await this.studentService.createStudent(body);
      res.statusCode = 201;
      if (data) {
        res.send({
          message: "Student successfully created",
          success: true,
          student: data,
        });
      }
    } catch (error) {
      res.statusCode = 400;
      res.send({
        message: error.message,
        success: false,
      });
    }
  }
  async joinGroupController(req, res) {
    try {
      const { studentId } = req.params;
      const body = req.body;
      const data = await this.studentService.joinGroup(studentId, body);
      res.statusCode = 200;
      res.send({
        message: "Successfully joined",
        success: true,
      });
    } catch (error) {
      res.statusCode = 400;
      res.send({
        message: error.message,
        success: false,
      });
    }
  }
  async updateStudentController(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const data = await this.studentService.updateStudent(id, body);
      res.statusCode = 200;
      res.send({
        message: "Student successfully updated",
        success: true,
        student: data,
      });
    } catch (error) {
      if (error.message === "student-not-found") {
        res.statusCode = 404;
        res.send({
          message: "Student not found",
          success: false,
        });
      } else {
        res.statusCode = 400;
        res.send({
          message: error.message,
          success: false,
        });
      }
    }
  }
  async deleteStudentController(req, res) {
    try {
      const { id } = req.params;
      const data = await this.studentService.deleteStudent(id);
      if (data) {
        res.statusCode = 200;
        res.send({
          message: "Student successfully deleted",
          success: true,
        });
      }
    } catch (error) {
      if (error.message === "student-not-found") {
        res.statusCode = 404;
        res.send({
          message: "Student not found",
          success: false,
        });
      } else {
        res.statusCode = 400;
        res.send({
          message: error.message,
          success: false,
        });
      }
    }
  }
}

export default studentController;
