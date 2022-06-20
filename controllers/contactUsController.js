const randomId = require("../common/randomIdGenerate");
const ContactUs = require("../model/ContactUsModel");

const contactUsPostController = async (req, res, next) => {
  const { name, email, subject, description } = req.body;

  try {
    const newContact = await ContactUs.create({
      _id: randomId(),
      name,
      email,
      subject,
      description,
    });

    if (newContact) {
      res.status(200).json({
        success: true,
        message: `Thank you. We are communicating with you very quickly on this matter.!`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// admin get contact info
const getContactUsController = async (req, res, next) => {
  try {
    const allContactUsInfo = await ContactUs.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (allContactUsInfo) {
      res.status(200).json({
        success: true,
        data: allContactUsInfo,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// admin delete contact info
const deleteContactUsInfoController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await ContactUs.findOne({ where: { _id: id } });

    if (contact) {
      const deleteContactInfo = await ContactUs.destroy({ where: { _id: id } });

      if (deleteContactInfo) {
        return res.status(200).json({
          success: true,
          data: deleteContactInfo,
          message: `Contact Information deleted successfully.!`,
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
  contactUsPostController,
  getContactUsController,
  deleteContactUsInfoController,
};
