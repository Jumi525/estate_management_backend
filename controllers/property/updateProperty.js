const PropertyModel = require('../../model/propertyModel');
const Update_Property = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const propertyObject = req.body;
    const UpdateProperty = await PropertyModel.findByIdAndUpdate(
      propertyId,
      propertyObject,
      {
        new: true,
      }
    );
    if (UpdateProperty) {
      res.status(201).json({
        success: true,
        message: 'Property update Successfully',
        data: UpdateProperty,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No such property with id ${propertyId} exist in the data base`,
      });
    }
  } catch (error) {
    console.log('error occured while updating a property');
    res.status(500).json({
      success: false,
      message: 'error occured while updating a property',
    });
  }
};

module.exports = Update_Property;
