const randomId = require("../common/randomIdGenerate");
const Employee = require("../model/EmployeeModel");
const { unlink } = require("fs");
const path = require("path");

// employee register
const employeeRegisterController = async (req, res, next) => {
  const { name, email, phone, position, salary, joinDate, address } = req.body;
  // const avatar = req.files["avatar"][0].filename;
  // const nationalIdCardAvatar = req.files["nationalIDCard"][0].filename;

  try {
    if (req.files) {
      const data = {
        _id: randomId(),
        name,
        email,
        phone,
        salary,
        position,
        avatar: req.files["avatar"][0].filename || "",
        joinDate,
        nationalIdCard: req.files["nationalIDCard"][0].filename || "",
        address,
      };

      const newEmployee = await Employee.create(data);

      if (newEmployee) {
        return res.status(200).json({
          success: true,
          message: `Employee added successfully.!`,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// single employee
const singleEmployeeController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findOne({ where: { _id: id } });

    if (employee) {
      return res.status(200).json({
        success: true,
        data: employee,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// all employee
const allEmployeeController = async (req, res, next) => {
  try {
    const allEmployee = await Employee.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (allEmployee) {
      return res.status(200).json({
        success: true,
        data: allEmployee,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// update employee
const updateEmployeeController = async (req, res, next) => {
  const { id } = req.params;

  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete employee
const deleteEmployeeController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findOne({ where: { _id: id } });

    if (employee) {
      const deleteEmployee = await Employee.destroy({
        where: { _id: id },
      });

      if (deleteEmployee) {
        // delete prev employee avatar
        unlink(
          path.join(
            path.dirname(__dirname),
            `/public/uploads/${employee.avatar}`
          ),
          (err) => {
            if (err) console.log(err);
          }
        );

        // delete prev employee id card avatar
        unlink(
          path.join(
            path.dirname(__dirname),
            `/public/uploads/${employee.nationalIdCard}`
          ),
          (err) => {
            if (err) console.log(err);
          }
        );

        return res.status(200).json({
          success: true,
          data: deleteEmployee,
          message: `Employee deleted successfully.!`,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

module.exports = {
  employeeRegisterController,
  singleEmployeeController,
  allEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
};
