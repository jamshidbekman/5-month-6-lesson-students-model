import { groupModel } from "../models/group.model.js";
import { studentModel } from "../models/student.model.js";

class studentService {
  constructor() {
    this.studentModel = studentModel;
    this.groupModel = groupModel;
  }
  async getStudents() {
    const students = await this.studentModel.find();
    if (students !== null) {
      return students;
    }
  }
  async getStudent(id) {
    const student = await this.studentModel.findOne({ _id: id }).populate({
      path: "groups",
      select: "_id name teacher_name time",
    });
    if (student !== null) {
      return student;
    } else {
      throw new Error("student-not-found");
    }
  }
  async createStudent(body) {
    const data = await this.studentModel.create(body);
    if (data !== null) {
      return data;
    } else {
      throw new Error("Something went wrong!");
    }
  }
  async joinGroup(studentId, { group_id }) {
    const groups = await this.groupModel.find({ _id: group_id });
    if (groups.length >= 1) {
      const student = await this.studentModel.findByIdAndUpdate(studentId, { $push: { groups: group_id } }, { new: true });
      await this.groupModel.findByIdAndUpdate(group_id, { $push: { students: studentId } }, { new: true });
      if (student !== null) {
        return student;
      }
    } else {
      throw new Error("No group found with this id");
    }
  }
  async updateStudent(id, body) {
    const data = await this.studentModel.findOneAndUpdate({ _id: id }, { ...body }, { returnDocument: "after" }).populate({
      path: "groups",
      select: "_id name teacher_name time",
    });
    if (data !== null) {
      return data;
    } else {
      throw new Error("student-not-found");
    }
  }
  async deleteStudent(id) {
    const data = await this.studentModel.findOneAndDelete({ _id: id });
    if (data !== null) {
      await this.groupModel.updateMany({ students: id }, { $pull: { students: id } });
      return true;
    } else {
      throw new Error("student-not-found");
    }
  }
}
export default studentService;
