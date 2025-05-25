const PropertyModel = require('../../model/propertyModel');
const Post_Property = async (req, res) => {
  try {
    const property = req.body;
    const newlyCreatedProperty = await PropertyModel.insertOne(property);
    console.log('Newly created property:', newlyCreatedProperty);
    if (newlyCreatedProperty) {
      res.status(201).json({
        success: true,
        message: 'Property Added Successfully',
        data: newlyCreatedProperty,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'could not post any property',
      });
    }
  } catch (error) {
    console.log('Error occured while posting a property');
    res.status(500).json({
      success: false,
      message: 'Error occured while posting a property',
    });
  }
};

module.exports = Post_Property;
