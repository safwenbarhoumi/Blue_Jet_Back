const Language = require("../models/language");

// Function to update the type of the language or add it if it doesn't exist
const updateTypeLanguage = async (req, res) => {
  try {
    const farmId = req.params.id;
    const type = req.body.type;

    // Find the language by farm ID
    let language = await Language.findOne({ farm: farmId });
    if (language) {
      // If language exists, update the type
      language.type = type;
    } else {
      // If language does not exist, create a new one
      language = new Language({
        farm: farmId,
        type: type,
      });
    }

    // Save the language document
    await language.save();

    res
      .status(200)
      .json({ message: "Language type updated successfully", language });
  } catch (error) {
    console.error("Error updating language type:", error); // Log the error for debugging
    res.status(500).json({
      message: "Error updating language type",
      error: error.message || error,
    });
  }
};

// Function to get the type of the language by farmId
const getLanguageType = async (req, res) => {
  try {
    const farmId = req.params.id;

    // Find the language by farmId
    const language = await Language.findOne({ farm: farmId });

    if (language) {
      res.status(200).json({ type: language.type });
    } else {
      res
        .status(404)
        .json({ message: "Language not found for the specified farm" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching language type", error });
  }
};

module.exports = {
  updateTypeLanguage,
  getLanguageType,
};
