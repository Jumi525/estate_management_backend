const saveModel = require('../../model/savepropertymodel');
const Remove_Property = async (req, res) => {
  try {
    const { user_Id } = req.userInfo;
    const propertyId = req.params.id;
    const RemoveProperty = await saveModel.deleteOne({
      $and: [{ propertyId }, { userId: user_Id }],
    });
    if (RemoveProperty.deletedCount > 0) {
      res.status(201).json({
        success: true,
        message: `Property with id ${propertyId} Removed Successfully`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No such property with id ${propertyId} exist in the data base`,
      });
    }
  } catch (error) {
    console.log('error occured while Removing a property');
    res.status(500).json({
      success: false,
      message: 'error occured while Removing a property',
    });
  }
};

module.exports = Remove_Property;
