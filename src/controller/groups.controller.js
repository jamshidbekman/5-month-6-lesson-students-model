import groupService from "../service/groups.service.js";

class groupController {
  constructor() {
    this.groupService = new groupService();
  }
  async createGroupController(req, res) {
    try {
      const body = req.body;
      const data = await this.groupService.createGroup(body);
      res.statusCode = 201;
      res.send({
        message: "Group successfully created",
        success: true,
        group: data,
      });
    } catch (error) {
      res.statusCode = 400;
      res.send({
        message: error.message,
      });
    }
  }
  async getGroupsController(req, res) {
    try {
      const data = await this.groupService.getGroups();
      res.statusCode = 200;
      res.send(data);
    } catch (error) {
      if (error.message === "groups-not-found") {
        res.statusCode = 404;
        res.send({
          message: "Groups not found",
        });
      } else {
        res.statusCode = 400;
        res.send({
          message: error.message,
        });
      }
    }
  }
  async getGroupController(req, res) {
    try {
      const { id } = req.params;
      const data = await this.groupService.getGroup(id);
      if (data) {
        res.statusCode = 200;
        res.send(data);
      }
    } catch (error) {
      if (error.message === "group-not-found") {
        res.statusCode = 404;
        res.send({
          message: "Group not found",
        });
      } else {
        res.statusCode = 400;
        res.send({
          message: error.message,
        });
      }
    }
  }
  async updateGroupController(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const data = await this.groupService.updateGroup(id, body);
      if (data) {
        res.statusCode = 200;
        res.send({
          message: "Group successfully updated",
          success: true,
          group: data,
        });
      }
    } catch (error) {
      if (error.message === "group-not-found") {
        res.statusCode = 404;
        res.send({
          message: "Group not found",
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
  async deleteGroupController(req, res) {
    try {
      const { id } = req.params;
      const data = await this.groupService.deleteGroup(id);
      if (data) {
        res.statusCode = 200;
        res.send({
          message: "Group successfully deleted",
          success: true,
        });
      }
    } catch (error) {
      if (error.message === "group-not-found") {
        res.statusCode = 404;
        res.send({
          message: "Group not found",
          success: false,
        });
      } else {
        res.statusCode = 400;
        res.send({
          message: error.message,
        });
      }
    }
  }
}

export default groupController;
