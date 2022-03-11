/** Middleware to create modular, mountable route handlers */
const router = require('express').Router();
const { New_Sign_Up } = require('../controllers/Auth.controller')

/**
 * @summary Routing
 * USERS/ROOT: GET http://localhost:3000/auth
 * NEW-SIGNUP: GET http://localhost:3000/auth/new-signup
 * 
 * SIGN-IN: GET http://localhost:3000/auth/sign-in
 * SIGN-IN: POST http://localhost:3000/auth/sign-in
 * 
 * SIGN-OUT: POST http://localhost:3000/auth/sign-out/
 * 
 * RESET-PASSWORD: GET http://localhost:3000/auth
 * RESET-PASSWORD: POST http://localhost:3000/auth
 */

router.post('/', New_Sign_Up);
router.post('/new-signup', New_Sign_Up);

// router.get('/sign-in', Sign_In);
// router.post('/sign-in', Sign_In);

// router.post('/sign-out/', Sign_Out) 

// router.get('/reset-password', Reset_Password);
// router.post('/reset-password/:id/:token', Reset_Password);

module.exports = router;
