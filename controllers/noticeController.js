const Notice = require("../model/NoticeModel");

// post notice
const addNoticePostController = async (req, res, next) => {
  const { title, date, message } = req.body;

  const id = randomId();

  try {
    const newNotice = await Notice.create({
      _id: id,
      ...req.body,
    });

    res.status(200).json({
      success: true,
      message: `Notice added successfully.!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// get all notice
const getAllNotice = async (req, res, next) => {
  try {
    const allNotice = await Notice.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (allNotice) {
      res.status(200).json({
        success: true,
        data: allNotice,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// get single notice
const singleNotice = async (req, res, next) => {
  const { id } = req.params;

  try {
    const notice = await Notice.findOne({ where: { _id: id } });

    res.status(200).json({
      success: true,
      data: notice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete notice
const deleteNotice = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteNotice = await Notice.destroy({ where: { _id: id } });

    res.status(200).json({
      success: true,
      data: deleteNotice,
      message: `Notice deleted successfully.!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// update notice
const updateNotice = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);

  try {
    await Notice.update({ ...req.body }, { where: { _id: id } }).then(
      (result) => {
        if (result) {
          // success response
          res.status(200).json({
            success: true,
            message: `Updated successfully.!`,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// random id generate
const randomId = () => {
  let ID = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < 12; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
};

module.exports = {
  addNoticePostController,
  getAllNotice,
  deleteNotice,
  singleNotice,
  updateNotice,
};
