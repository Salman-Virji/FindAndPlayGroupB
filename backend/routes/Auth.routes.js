/** Middleware to create modular, mountable route handlers */
const router = require('express').Router();
const {
    New_Sign_Up,
    Sign_In,
    Sign_Out,
    Password_Reset_Request,
    Password_Update,
    Password_Update_Page,
} = require('../controllers/Auth.controller');

/**
 * @summary Routing
 * USERS/ROOT: GET http://localhost:3000/auth
 *
 * NEW-SIGNUP: POST http://localhost:3000/auth/new-signup
 * SIGN-IN: POST http://localhost:3000/auth/sign-in
 * SIGN-OUT: POST http://localhost:3000/auth/sign-out
 *
 * SEND-RESET-LINK: POST http://localhost:3000/auth/reset-password
 *
 * SET-NEW-PASSWORD: GET http://localhost:3000/auth/reset-password/:id/:token
 * UPDATE-PASSWORD: POST http://localhost:3000/auth/reset-password/:id/:token
 */

router.get('/', async (request, response) => response.render('root'));

router.post('/new-signup', New_Sign_Up);
router.post('/sign-in', Sign_In);
router.post('/sign-out/', Sign_Out);

router.post('/reset-password', Password_Reset_Request);

router.get('/reset-password/:id/:token', Password_Update_Page);
router.post('/reset-password/:id/:token', Password_Update);

module.exports = router;
