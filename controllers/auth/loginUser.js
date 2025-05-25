const Authentication = require('../../model/authModel');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const checkExistingUser = await Authentication.findOne({ email });
      if (!checkExistingUser) {
        res.status(400).json({
          success: false,
          message: `No User with email address ${email}`,
        });
      }

      const isMatch = await bycrypt.compare(
        password,
        checkExistingUser.password
      );
      if (!isMatch) {
        res.status(400).json({
          success: false,
          message: `Invalid Password inputed`,
        });
      }
      const accessToken = jwt.sign(
        {
          user_Id: checkExistingUser._id,
          role: checkExistingUser.role,
          email: checkExistingUser.email,
          name: checkExistingUser.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '50m',
        }
      );

      res.status(200).json({
        success: true,
        message: `${email} has login successfully`,
        accessToken,
        user: {
          email: checkExistingUser.email,
          role: checkExistingUser.role,
          name: checkExistingUser.name,
        },
      });
    } else if (!email || !password) {
      !email &&
        res.status(400).json({
          success: false,
          message: `please Add your email`,
        });
      !password &&
        res.status(400).json({
          success: false,
          message: `please Add your password`,
        });
    } else {
      res.status(404).json({
        success: false,
        message: `could not login user`,
      });
    }
  } catch (error) {
    console.log('error occured while logging in, Please try again');

    res.status(500).json({
      sucess: false,
      message: 'error occured while logging in, Please try again',
    });
  }
};

module.exports = Login;
