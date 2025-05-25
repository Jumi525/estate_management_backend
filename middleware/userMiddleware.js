const AgentUser = (req, res, next) => {
  try {
    const { role } = req.userInfo;
    if (role !== 'agent') {
      return res.status(400).json({
        success: false,
        message: `Only admin is allowed to make Request to this endpoint`,
      });
    }
    next();
  } catch (error) {
    console.log('Error accessing this site');
    return res.status(500).json({
      success: false,
      message: `Error accessing this site`,
    });
  }
};

module.exports = AgentUser;
