const express = require('express');
const router = express.Router();

const {
    signUpUser,
    loginUser,
    findUser,
    home,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', home)
router.post('/', signUpUser);
router.post('/login', loginUser);
router.get('/find', protect, findUser);

module.exports = router;