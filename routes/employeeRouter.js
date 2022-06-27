const employeeRouter = require("express").Router({ caseSensitive: true });
const {
  employeeRegisterController,
  singleEmployeeController,
  allEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
} = require("../controllers/employeeController");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/singleFileUpload");
const {
  employeeValidator,
  employeeValidatorErrorHandler,
} = require("../validator/employeeValidator");

employeeRouter.post(
  "/register",
  isAdmin,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "nationalIDCard", maxCount: 1 },
  ]),
  employeeValidator,
  employeeValidatorErrorHandler,
  employeeRegisterController
);
employeeRouter.get("/single-employee/:id", isAdmin, singleEmployeeController);
employeeRouter.get("/all-employee/", isAdmin, allEmployeeController);
employeeRouter.put("/update/:id", isAdmin, updateEmployeeController);
employeeRouter.delete("/delete/:id", isAdmin, deleteEmployeeController);

module.exports = employeeRouter;
