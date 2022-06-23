const randomId = require("../common/randomIdGenerate");
const OnlineAdmission = require("../model/OnlineAdmissionModel");
const { unlink } = require("fs");
const path = require("path");

// online admission post controller
const onlineAdmissionPostController = async (req, res, next) => {
  const {
    studentClass,
    firstName,
    lastName,
    gender,
    dob,
    religion,
    studentPhone,
    studentEmail,
    guardianAddress,
    guardianName,
    guardianRelation,
    nationalIdCardNumber,
    prevSchoolDetails,
    guardianPhone,
    guardianEmail,
    guardianOccupation,
  } = req.body;
  // const studentAvatar = req.files["studentAvatar"][0].filename;
  // const guardianAvatar = req.files["guardianAvatar"][0].filename;

  try {
    if (req.files) {
      // data
      const data = {
        _id: randomId(),
        student_class: studentClass,
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        dob: dob,
        religion: religion,
        student_phone: studentPhone,
        student_email: studentEmail || "",
        student_avatar: req.files["studentAvatar"][0].filename || "",
        guardian_name: guardianName,
        guardian_relation: guardianRelation,
        guardian_phone: guardianPhone,
        guardian_email: guardianEmail || "",
        guardian_avatar: req.files["guardianAvatar"][0].filename || "",
        guardian_occupation: guardianOccupation,
        guardian_address: guardianAddress,
        national_id_number: nationalIdCardNumber,
        prev_school_details: prevSchoolDetails,
      };

      const newAdmission = await OnlineAdmission.create(data);

      if (newAdmission) {
        return res.status(200).json({
          success: true,
          message: `Thank You. Admission done, then a request was made to contact the school authorities.!`,
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

// admin get all register data
const getAllRegisterDataController = async (req, res, next) => {
  try {
    const allRegisterData = await OnlineAdmission.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (allRegisterData) {
      return res.status(200).json({
        success: true,
        data: allRegisterData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// update status status controller
const updateStatusController = async (req, res, next) => {
  const { id } = req.params;

  try {
    await OnlineAdmission.update(
      { status: "Approved" },
      { where: { _id: id } }
    ).then((result) => {
      if (result) {
        // success response
        res.status(200).json({
          success: true,
          message: `Status Updated successfully.!`,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete student
const deleteStudentController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const student = await OnlineAdmission.findOne({ where: { _id: id } });

    if (student) {
      const deleteStudent = await OnlineAdmission.destroy({
        where: { _id: id },
      });

      if (deleteStudent) {
        // delete prev student avatar
        unlink(
          path.join(
            path.dirname(__dirname),
            `/public/uploads/${student.student_avatar}`
          ),
          (err) => {
            if (err) console.log(err);
          }
        );

        // delete prev guardian avatar
        unlink(
          path.join(
            path.dirname(__dirname),
            `/public/uploads/${student.guardian_avatar}`
          ),
          (err) => {
            if (err) console.log(err);
          }
        );

        return res.status(200).json({
          success: true,
          data: deleteTeacher,
          message: `User deleted successfully.!`,
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

// get single student data
const getSingleStudentData = async (req, res, next) => {
  const { id } = req.params;

  try {
    const student = await OnlineAdmission.findOne({ where: { _id: id } });

    if (student) {
      res.status(200).json({
        success: true,
        data: student,
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
  onlineAdmissionPostController,
  getAllRegisterDataController,
  updateStatusController,
  deleteStudentController,
  getSingleStudentData,
};
