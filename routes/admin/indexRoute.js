const dashboardRoute = require("./dashboardRoute");

module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoute);
};
