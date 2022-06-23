const authRouter = require("./authRouter");
const classTimeTableRouter = require("./classTimeTableRouter");
const contactUsRouter = require("./contactUsRouter");
const examScheduleRouter = require("./examScheduleRouter");
const noticeRouter = require("./noticeRouter");
const onlineAdmissionRouter = require("./onlineAdmissionRouter");
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
    path: "/exam-schedule",
    handler: examScheduleRouter,
  },
  {
    path: "/class-time-table",
    handler: classTimeTableRouter,
  },
  {
    path: "/contact-us",
    handler: contactUsRouter,
  },
  {
    path: "/online-admission",
    handler: onlineAdmissionRouter,
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
