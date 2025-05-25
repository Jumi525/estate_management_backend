const SaveModel = require('../../model/savepropertymodel');
const Save_Property = async (req, res) => {
  try {
    const { user_Id } = req.userInfo;
    const propertyId = req.params.id;
    const newlySavedProperty = await SaveModel.create({
      userId: user_Id,
      propertyId,
    });
    if (newlySavedProperty) {
      res.status(201).json({
        success: true,
        message: 'Property Saved Successfully',
        data: newlySavedProperty,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'could not Saved any property',
      });
    }
  } catch (error) {
    console.log('Error occured while Saving a property');
    res.status(500).json({
      success: false,
      message: 'Error occured while Saving a property',
    });
  }
};

module.exports = Save_Property;
