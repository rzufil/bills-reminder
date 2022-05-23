const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    updateUser,
    getMe,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.put('/', protect, updateUser);
router.get('/me', protect, getMe);

module.exports = router;