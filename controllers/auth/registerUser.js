const Authentication = require('../../model/authModel');
const bycrypt = require('bcryptjs');
const Register = async (req, res) => {
  try {
    const salt = await bycrypt.genSalt(10);

    const { name, email, password, role } = req.body;

    if (name && email && password) {
      const checkExistingUser = await Authentication.findOne({ email });
      if (checkExistingUser) {
        res.status(400).json({
          success: false,
          message: `${email} has been used by another user, please use a unique email address`,
        });
      }
      const hashedPassword = await bycrypt.hash(password, salt);

      const newlyCreatedUser = Authentication.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'agent',
      });

      if (newlyCreatedUser) {
        res.status(200).json({
          success: true,
          message: `${role || 'user'} ${name} has been created successfully`,
        });
      } else {
        res.status(400).json({
          success: false,
          message: `unable to register ${role || 'user'} ${name}`,
        });
      }
    } else if (!name || !email || !password) {
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

      !name &&
        res.status(400).json({
          success: false,
          message: `please Add your name`,
        });
    } else {
      res.status(404).json({
        success: false,
        message: `could not register user`,
      });
    }
  } catch (error) {
    console.log('error occured while signing in, Please try again');

    res.status(500).json({
      sucess: false,
      message: 'error occured while signing in, Please try again',
    });
  }
};

module.exports = Register;
