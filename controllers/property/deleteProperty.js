const PropertyModel = require('../../model/propertyModel');
const Delete_Property = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const DeletedProperty = await PropertyModel.findByIdAndDelete(propertyId);
    if (DeletedProperty) {
      res.status(201).json({
        success: true,
        message: 'Property deleted Successfully',
        data: DeletedProperty,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No such property with id ${propertyId} exist in the data base`,
      });
    }
  } catch (error) {
    console.log('error occured while deleting a property');
    res.status(500).json({
      success: false,
      message: 'error occured while deleting a property',
    });
  }
};

module.exports = Delete_Property;
