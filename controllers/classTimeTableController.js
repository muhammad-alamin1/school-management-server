const randomId = require("../common/randomIdGenerate");
const ClassTimeTable = require("../model/ClassTimeTable");
const { unlink } = require("fs");
const path = require("path");

const classTimeTablePostController = async (req, res, next) => {
  const { userClass } = req.body;
  const file = req.file?.filename;

  try {
    if (req.file) {
      const newTime = await ClassTimeTable.create({
        _id: randomId(),
        user_class: userClass,
        file,
      });

      if (newTime) {
        return res.status(200).json({
          success: true,
          message: `Class routing added successfully.!`,
        });
      } else {
        // if found error delete file
        unlink(
          path.join(path.dirname(__dirname), `/public/uploads/pdf/${file}`),
          (err) => {
            if (err) console.log(err);
          }
        );
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// get all class time schedule
const getAllTimeTable = async (req, res, next) => {
  try {
    const allTimeTable = await ClassTimeTable.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (allTimeTable) {
      res.status(200).json({
        success: true,
        data: allTimeTable,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete time schedule
const deleteClassTimeSchedule = async (req, res, next) => {
  const { id } = req.params;

  try {
    const time = await ClassTimeTable.findOne({ where: { _id: id } });

    if (time) {
      const deleteTimeSchedule = await ClassTimeTable.destroy({
        where: { _id: id },
      });

      if (deleteTimeSchedule) {
        // delete prev file
        unlink(
          path.join(
            path.dirname(__dirname),
            `/public/uploads/pdf/${time.file}`
          ),
          (err) => {
            if (err) console.log(err);
          }
        );

        return res.status(200).json({
          success: true,
          data: deleteTimeSchedule,
          message: `Class time schedule deleted successfully.!`,
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
  classTimeTablePostController,
  getAllTimeTable,
  deleteClassTimeSchedule,
};
