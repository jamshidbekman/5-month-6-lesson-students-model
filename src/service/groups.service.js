import { groupModel } from "../models/group.model.js";
import { studentModel } from "../models/student.model.js";

class groupService {
  constructor() {
    this.groupModel = groupModel;
    this.studentModel = studentModel
  }
  async createGroup(body) {
    const data = await this.groupModel.create(body);
    if (data !== null) {
      return data;
    } else {
      throw new Error("Something went wrong!");
    }
  }
  async getGroups() {
    const groups = await this.groupModel.find().populate({
      path: "students",
      select: "_id first_name last_name phone_number phone_number birthdate",
    });
    if (groups.length >= 1) {
      return groups;
    } else {
      throw new Error("groups-not-found");
    }
  }
  async getGroup(id) {
    const group = await this.groupModel.findById(id).populate({
      path: "students",
      select: "first_name last_name phone_number adress birthdate",
    });
    if (group !== null) {
      return group;
    } else {
      throw new Error("group-not-found");
    }
  }
  async updateGroup(id, body) {
    const group = await this.groupModel.findOneAndUpdate({ _id: id }, { ...body }, { returnDocument: "after" }).populate({
      path: "students",
      select: "first_name last_name phone_number adress birthdate",
    });
    if (group !== null) {
      return group;
    } else {
      throw new Error("group-not-found");
    }
  }
  async deleteGroup(id) {
    const group = await this.groupModel.findByIdAndDelete(id);
    if (group !== null) {
      await this.studentModel.updateMany({ groups: id }, { $pull: { groups: id } });
      return true;
    } else {
      throw new Error("group-not-found");
    }
  }
}
export default groupService;
