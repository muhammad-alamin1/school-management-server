const randomId = require("../common/randomIdGenerate");
const ExamResult = require("../model/ResultModel");

// send result
const sendResultController = async (req, res, next) => {
  const {
    email,
    userClass,
    section,
    roll,
    title,
    banglaFirst,
    banglaSecond,
    englishFirst,
    englishSecond,
    mathematics,
    ict,
    cgpa,
  } = req.body;

  try {
    const data = {
      _id: randomId(),
      email,
      user_class: userClass,
      section,
      roll,
      exam_title: title,
      bangla_first: banglaFirst,
      bangla_second: banglaSecond,
      english_first: englishFirst,
      english_second: englishSecond,
      mathematics,
      ict,
      cgpa,
    };

    const result = await ExamResult.create(data);

    if (result) {
      // success response
      res.status(200).json({
        success: true,
        message: `Result send successfully.!`,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// admin get all data
const getAllDataController = async (req, res, next) => {
  try {
    const allExamResult = await ExamResult.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (allExamResult) {
      res.status(200).json({
        success: true,
        data: allExamResult,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// user get exam data
const getSingleDataController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await ExamResult.findAll({
      where: { email: id },
      order: [["createdAt", "DESC"]],
    });

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete exam
const deleteExam = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteExam = await ExamResult.destroy({ where: { exam_title: id } });

    if (deleteExam) {
      return res.status(200).json({
        success: true,
        data: deleteExam,
        message: `Exam deleted successfully.!`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete exam
const deleteExamById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteExam = await ExamResult.destroy({ where: { _id: id } });

    if (deleteExam) {
      return res.status(200).json({
        success: true,
        data: deleteExam,
        message: `Exam deleted successfully.!`,
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
  sendResultController,
  getAllDataController,
  getSingleDataController,
  deleteExam,
  deleteExamById,
};
