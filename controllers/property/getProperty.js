const PropertyModel = require('../../model/propertyModel');
const Get_Property = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const GetProperty = await PropertyModel.findById(propertyId);
    if (GetProperty) {
      res.status(201).json({
        success: true,
        message: 'Property returned Successfully',
        data: GetProperty,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No such property with id ${propertyId} exist in the data base`,
      });
    }
  } catch (error) {
    console.log('error occured while getting a property');
    res.status(500).json({
      success: false,
      message: 'error occured while getting a property',
    });
  }
};

module.exports = Get_Property;
