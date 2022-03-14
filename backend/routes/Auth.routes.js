/** Middleware to create modular, mountable route handlers */
const router = require('express').Router();
const { New_Sign_Up, Sign_In, Sign_Out, Reset_Password_Link, Reset_Password } = require('../controllers/Auth.controller')

/**
 * @summary Routing
 * USERS/ROOT: GET http://localhost:3000/auth
 * NEW-SIGNUP: GET http://localhost:3000/auth/new-signup
 * SIGN-IN: POST http://localhost:3000/auth/sign-in
 * SIGN-OUT: POST http://localhost:3000/auth/sign-out
 * RESET-PASSWORD-REQUEST: POST http://localhost:3000/auth/reset
 * UPDATE-PASSWORD: GET http://localhost:3000/auth/:userId/:token
 * UPDATE-PASSWORD: POST http://localhost:3000/auth/:userId/:token
 */

router.post('/', New_Sign_Up);
router.post('/new-signup', New_Sign_Up);
router.post('/sign-in', Sign_In);
router.post('/sign-out/', Sign_Out) 
router.get('/reset-password', Reset_Password_Link);
router.post('/reset-password/:id/:token', Reset_Password);

module.exports = router;
