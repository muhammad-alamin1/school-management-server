const os = require("os");
const DeviceDetector = require("node-device-detector");
const DeviceHelper = require("node-device-detector/helper");

const osDetected = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const osDetectionController = async (req, res, next) => {
  const { agent } = req.body;

  try {
    const detector = new DeviceDetector({
      clientIndexes: true,
      deviceIndexes: true,
      deviceAliasCode: false,
    });

    const result = detector.detect(agent);

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
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

module.exports = {
  osDetected,
  osDetectionController,
};
