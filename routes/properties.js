const express = require('express');
const Get_properties = require('../controllers/property/getProperties');
const Get_property = require('../controllers/property/getProperty');
const Post_property = require('../controllers/property/postProperty');
const Delete_property = require('../controllers/property/deleteProperty');
const Update_property = require('../controllers/property/updateProperty');
const Save_property = require('../controllers/property/saveProperty');
const Remove_property = require('../controllers/property/removeProperty');
const All_saved_property = require('../controllers/property/getSavedProperty');
const AuthorizedUser = require('../middleware/tokenMiddleware');
const AgentUser = require('../middleware/userMiddleware');

const router = express.Router();

router.get('/home_page', AuthorizedUser, (req, res) => {
  const { role, name } = req.userInfo;
  res.status(200).json({
    success: true,
    message: `${role} ${name} just entered into the Homepage`,
  });
});

router.get('/properties', Get_properties);
router.get('/properties/:id', Get_property);
router.get('/get_saved', AuthorizedUser, All_saved_property);
router.post('/save_property/:id', AuthorizedUser, Save_property);
router.delete('/remove_property/:id', AuthorizedUser, Remove_property);
router.post('/post_property', AuthorizedUser, AgentUser, Post_property);
router.put('/update_property/:id', AuthorizedUser, AgentUser, Update_property);

router.delete(
  '/delete_property/:id',
  AuthorizedUser,
  AgentUser,
  Delete_property
);

module.exports = router;
