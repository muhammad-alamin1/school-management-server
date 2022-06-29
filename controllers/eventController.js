const randomId = require("../common/randomIdGenerate");
const Event = require("../model/EventModel");

// post event
const addEventPostController = async (req, res, next) => {
  const { title, date, message } = req.body;

  const id = randomId();

  try {
    const newEvent = await Event.create({
      _id: id,
      ...req.body,
    });

    if (newEvent) {
      res.status(200).json({
        success: true,
        message: `Event added successfully.!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// get all event
const getAllEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (allEvents) {
      res.status(200).json({
        success: true,
        data: allEvents,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// get single event
const singleEvent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const event = await Event.findOne({ where: { _id: id } });

    if (event) {
      res.status(200).json({
        success: true,
        data: event,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete event
const deleteEvent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteEvent = await Event.destroy({ where: { _id: id } });

    if (deleteEvent) {
      return res.status(200).json({
        success: true,
        data: deleteNotice,
        message: `Notice deleted successfully.!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// update event
const updateEvent = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Event.update({ ...req.body }, { where: { _id: id } }).then(
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
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

module.exports = {
  addEventPostController,
  getAllEvents,
  deleteEvent,
  singleEvent,
  updateEvent,
};
