const express = require('express');
const {
  getMyProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  publicFeed
} = require('../controllers/profileController');

const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticate);

router.get('/me', getMyProfile);
router.post('/', createProfile);
router.put('/', updateProfile);
router.delete('/', deleteProfile);
router.get('/feed', publicFeed);

module.exports = router;
