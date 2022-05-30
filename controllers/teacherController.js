const Teacher = require("../model/TeacherModel");
const { unlink } = require("fs");
const path = require("path");

// add teacher
const registerTeacherPostController = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    gender,
    dob,
    address,
    subject,
    religion,
    joinDate,
    degree,
    institution,
    cgpa,
    salary,
  } = req.body;
  const file = req.file?.filename || "";

  try {
    const teacher = await Teacher.create({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      gender,
      dob,
      address,
      subject,
      religion,
      join_date: joinDate,
      degree,
      institution,
      cgpa,
      salary,
      avatar: file,
    });

    res.status(200).json({
      success: true,
      message: `Teacher added successfully.!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// get all data
const getAllTeacherController = async (req, res, next) => {
  try {
    const allTeachers = await Teacher.findAll({});

    res.status(200).json({
      success: true,
      data: allTeachers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// get single data
const getSingleTeacherController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findOne({ where: { email: id } });

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete
const deleteTeacherController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findOne({ where: { email: id } });
    const deleteTeacher = await Teacher.destroy({ where: { email: id } });

    // delete prev avatar
    unlink(
      path.join(path.dirname(__dirname), `/public/uploads/${teacher.avatar}`),
      (err) => {
        if (err) console.log(err);
      }
    );

    res.status(200).json({
      success: true,
      data: deleteTeacher,
      message: `Teacher deleted successfully.!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// update
const updateTeacherController = async (req, res, next) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    phone,
    gender,
    dob,
    address,
    subject,
    religion,
    joinDate,
    degree,
    institution,
    cgpa,
    salary,
  } = req.body;
  const file = req.file?.filename || "";

  // updated value

  try {
    const teacher = await Teacher.findOne({ where: { email: id } });

    if (req.file) {
      await Teacher.update(
        {
          ...req.body,
          avatar: file,
        },
        { where: { email: id } }
      ).then((result) => {
        if (result) {
          // delete prev avatar
          unlink(
            path.join(
              path.dirname(__dirname),
              `/public/uploads/${teacher.avatar}`
            ),
            (err) => {
              if (err) console.log(err);
            }
          );

          // success response
          res.status(200).json({
            success: true,
            message: `Updated successfully.!`,
          });
        }
      });
    } else {
      await Teacher.update({ ...req.body }, { where: { email: id } }).then(
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
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

module.exports = {
  registerTeacherPostController,
  getAllTeacherController,
  getSingleTeacherController,
  deleteTeacherController,
  updateTeacherController,
};
