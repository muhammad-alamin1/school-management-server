const authRouter = require("./authRouter");
const noticeRouter = require("./noticeRouter");
const rootRouter = require("./rootRouter");
const teacherRouter = require("./teacherRouter");
const topStudentRouter = require("./topStudentRouter");
const userProfileRouter = require("./userProfileRoutes");

const routes = [
  {
    path: "/auth",
    handler: authRouter,
  },
  {
    path: "/teacher",
    handler: teacherRouter,
  },
  {
    path: "/notice",
    handler: noticeRouter,
  },
  {
    path: "/user",
    handler: userProfileRouter,
  },
  {
    path: "/top-student",
    handler: topStudentRouter,
  },
  {
    path: "/",
    handler: rootRouter,
  },
];

const allRoutes = (app) => {
  routes.forEach((route) => {
    app.use(route.path, route.handler);
  });
};

module.exports = allRoutes;
