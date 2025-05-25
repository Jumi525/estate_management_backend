const PropertyModel = require('../../model/propertyModel');

const Get_Properties = async (req, res) => {
  try {
    const query = parseInt(req.query.page);
    const limits = parseInt(req.query.limit || 5);
    const sortBys = req.query.sortBy;
    const sortOrders = req.query.sortOrder;
    if (query) {
      const page = query || 1;
      const limit = limits;
      const skip = (page - 1) * limit;
      const sortBy = sortBys || 'createdAt';
      const sortOrder = sortOrders === 'asc' ? 1 : -1;
      const totalLength = await PropertyModel.countDocuments();
      const totalPages = Math.ceil(totalLength / limit);
      const sortObj = {};
      sortObj[sortBy] = sortOrder;
      const GetProperty = await PropertyModel.find()
        .sort(sortObj)
        .skip(skip)
        .limit(limit);
      if (GetProperty.length === 0) {
        res.status(404).json({
          success: false,
          message: 'No property found in the data base',
        });
      }
      res.status(201).json({
        success: true,
        message: 'Property returned Successfully',
        totalPages,
        currentPage: page,
        totalLength,
        data: GetProperty,
      });
    } else {
      const GetProperty = await PropertyModel.find({});
      if (GetProperty.length === 0) {
        res.status(404).json({
          success: false,
          message: 'No property found in the data base',
        });
      }
      res.status(201).json({
        success: true,
        message: 'Property returned Successfully',
        data: GetProperty,
      });
    }
  } catch (error) {
    console.log('error occured while getting properties');
    res.status(500).json({
      success: false,
      message: 'error occured while getting properties',
    });
  }
};

module.exports = Get_Properties;
