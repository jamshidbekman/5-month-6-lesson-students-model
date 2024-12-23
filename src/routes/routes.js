import groupsRouter from "./groups.routes.js";
import studentRouter from "./students.routes.js";

const Routes = () => {
  return [groupsRouter, studentRouter];
};

export default Routes;
