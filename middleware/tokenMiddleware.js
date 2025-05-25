const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const AuthorizedUser = (req, res, next) => {
  try {
    const bearerToken = req.headers['authorization'].split(' ')[1];

    if (!bearerToken) {
      return res.status(401).json({
        success: false,
        message: `Input your Authorization Token`,
      });
    }

    const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);

    if (!verified) {
      res.status(400).json({
        success: false,
        message: `Invalid auth Token`,
      });
    }
    req.userInfo = verified;
    next();
  } catch (error) {
    console.log('Error accessing this site, from authentication middleware');
    return res.status(500).json({
      success: false,
      message: `Error accessing this site, from authentication middleware`,
    });
  }
};

module.exports = AuthorizedUser;
