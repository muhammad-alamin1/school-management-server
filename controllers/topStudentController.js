const randomId = require("../common/randomIdGenerate");
const TopStudent = require("../model/TopStudentModel");

// post req
const addTopStudentPostController = async (req, res, next) => {
  const { fullName, registerId, roll, board, exam, examYear, cgpa } = req.body;
  const file = req.file?.filename;

  // data
  const value = {
    _id: randomId(),
    full_name: fullName,
    registration_id: registerId,
    roll_no: roll,
    board,
    exam,
    exam_year: examYear,
    cgpa,
  };

  try {
    if (req.file) {
      const newTopStudent = await TopStudent.create({ ...value, avatar: file });

      if (newTopStudent) {
        return res.status(200).json({
          success: true,
          message: `Student added successfully.!`,
        });
      }
    } else {
      const newTopStudent = await TopStudent.create(value);

      if (newTopStudent) {
        return res.status(200).json({
          success: true,
          message: `Student added successfully.!`,
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

// get all query
const getAllTopStudentsDataController = async (req, res, next) => {
  try {
    const allStudent = await TopStudent.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (allStudent) {
      return res.status(200).json({
        success: true,
        data: allStudent,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete student
const deleteStudent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteStudent = await TopStudent.destroy({ where: { _id: id } });

    if (deleteStudent) {
      return res.status(200).json({
        success: true,
        data: deleteStudent,
        message: `Student deleted successfully.!`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

module.exports = {
  addTopStudentPostController,
  getAllTopStudentsDataController,
  deleteStudent,
};
