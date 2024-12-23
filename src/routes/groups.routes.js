import { Router } from "express";
import groupController from "../controller/groups.controller.js";

const groupsRouter = Router();

const GroupController = new groupController();

groupsRouter.post("/groups", (req, res) => GroupController.createGroupController(req, res));
groupsRouter.get("/groups", (req, res) => GroupController.getGroupsController(req, res));
groupsRouter.get("/groups/:id", (req, res) => GroupController.getGroupController(req, res));
groupsRouter.put("/groups/:id", (req, res) => GroupController.updateGroupController(req, res));
groupsRouter.delete("/groups/:id", (req, res) => GroupController.deleteGroupController(req, res));

export default groupsRouter;
