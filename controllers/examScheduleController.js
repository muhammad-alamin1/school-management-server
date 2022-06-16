const randomId = require("../common/randomIdGenerate");
const ExamSchedule = require("../model/ExamSchedule");
const { unlink } = require("fs");
const path = require("path");

const examSchedulePostController = async (req, res, next) => {
  const { title } = req.body;
  const file = req.file?.filename;

  try {
    if (req.file) {
      const newExamCreate = await ExamSchedule.create({
        _id: randomId(),
        title,
        file,
      });

      if (newExamCreate) {
        return res.status(200).json({
          success: true,
          message: `Exam added successfully.!`,
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

// get all exam schedule
const getAllExamSchedule = async (req, res, next) => {
  try {
    const allExamSchedule = await ExamSchedule.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (allExamSchedule) {
      res.status(200).json({
        success: true,
        data: allExamSchedule,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete exam schedule
const deleteExamSchedule = async (req, res, next) => {
  const { id } = req.params;

  try {
    const exam = await ExamSchedule.findOne({ where: { _id: id } });

    if (exam) {
      const deleteExamSchedule = await ExamSchedule.destroy({
        where: { _id: id },
      });

      if (deleteExamSchedule) {
        // delete prev file
        unlink(
          path.join(
            path.dirname(__dirname),
            `/public/uploads/pdf/${exam.file}`
          ),
          (err) => {
            if (err) console.log(err);
          }
        );

        return res.status(200).json({
          success: true,
          data: deleteExamSchedule,
          message: `Exam schedule deleted successfully.!`,
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
  examSchedulePostController,
  getAllExamSchedule,
  deleteExamSchedule,
};
