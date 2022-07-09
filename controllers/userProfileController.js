const randomId = require("../common/randomIdGenerate");
const Register = require("../model/RegisterModel");
const UserProfile = require("../model/userProfileModel");
const { unlink } = require("fs");
const path = require("path");

// create profile post controller
const userCreateProfileController = async (req, res, next) => {
  const {
    fullName,
    phone,
    email,
    userClass,
    section,
    roll,
    gender,
    religion,
    dob,
    currentAddress,
    permanentAddress,
    fatherName,
    fatherPhone,
    fatherOccupation,
  } = req.body;
  const file = req.file?.filename;

  try {
    if (req.file) {
      const newProfileCreate = await UserProfile.create({
        _id: randomId(),
        full_name: fullName,
        phone,
        email,
        user_class: userClass,
        section,
        roll,
        gender,
        religion,
        dob,
        avatar: file || "",
        current_address: currentAddress,
        permanent_address: permanentAddress,
        father_name: fatherName,
        father_phone: fatherPhone,
        father_occupation: fatherOccupation,
      });

      return res.status(200).json({
        success: true,
        message: `Profile created successfully.!`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// create profile single get controller
const createProfileSingleGetDataController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserProfile.findOne({ where: { email: id } });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// user update profile controller
const userUpdateProfileController = async (req, res, next) => {
  const { id } = req.params;
  const {
    fullName,
    phone,
    email,
    userClass,
    section,
    roll,
    gender,
    religion,
    dob,
    currentAddress,
    permanentAddress,
    fatherName,
    fatherPhone,
    fatherOccupation,
  } = req.body;
  const file = req.file?.filename;

  try {
    const user = await UserProfile.findOne({ where: { email: id } });

    if (req.file) {
      await UserProfile.update(
        {
          ...req.body,
          full_name: fullName,
          user_class: userClass,
          avatar: file || "",
          current_address: currentAddress,
          permanent_address: permanentAddress,
          father_name: fatherName,
          father_phone: fatherPhone,
          father_occupation: fatherOccupation,
        },
        { where: { email: id } }
      ).then((result) => {
        if (result) {
          // delete prev avatar
          unlink(
            path.join(
              path.dirname(__dirname),
              `/public/uploads/${user.avatar}`
            ),
            (err) => {
              if (err) console.log(err);
            }
          );

          // success response
          return res.status(200).json({
            success: true,
            message: `Profile Updated Successfully.!`,
          });
        }
      });
    } else {
      //
      await UserProfile.update(
        {
          ...req.body,
          full_name: fullName,
          user_class: userClass,
          current_address: currentAddress,
          permanent_address: permanentAddress,
          father_name: fatherName,
          father_phone: fatherPhone,
          father_occupation: fatherOccupation,
        },
        { where: { email: id } }
      ).then((result) => {
        if (result) {
          // success response
          return res.status(200).json({
            success: true,
            message: `Profile Updated Successfully.!`,
          });
        }
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

// admin get all profile
const adminGetAllProfileController = async (req, res, next) => {
  try {
    const allProfile = await UserProfile.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: allProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// admin delete user profile and user
const adminDeleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userRegister = await Register.findOne({ where: { email: id } });
    const userProfile = await UserProfile.findOne({ where: { email: id } });

    if (userRegister) {
      // first delete register profile
      const deleteRegisterProfile = await Register.destroy({
        where: { email: id },
      });

      if (userProfile) {
        // delete create profile
        const deleteCreateProfile = await UserProfile.destroy({
          where: { email: id },
        });

        // delete prev avatar
        unlink(
          path.join(
            path.dirname(__dirname),
            `/public/uploads/${userProfile.avatar}`
          ),
          (err) => {
            if (err) console.log(err);
          }
        );

        // delete success response
        return res.status(200).json({
          success: true,
          message: `User deleted successfully.!.!`,
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

// profile status update
const profileStatusUpdateController = async (req, res, next) => {
  try {
    await UserProfile.update(
      { status: "Approved" },
      { where: { _id: req.params.id } }
    ).then((result) => {
      if (result) {
        // success response
        return res.status(200).json({
          success: true,
          message: `Status Updated Successfully.!`,
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

module.exports = {
  userCreateProfileController,
  createProfileSingleGetDataController,
  userUpdateProfileController,
  adminDeleteUser,
  adminGetAllProfileController,
  profileStatusUpdateController,
};
