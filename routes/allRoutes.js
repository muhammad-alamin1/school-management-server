const authRouter = require("./authRouter");
const rootRouter = require("./rootRouter");
const teacherRouter = require("./teacherRouter");

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
