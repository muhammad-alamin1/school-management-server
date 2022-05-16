const authRouter = require("./authRouter");
const rootRouter = require("./rootRouter");

const routes = [
  {
    path: "/auth",
    handler: authRouter,
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
