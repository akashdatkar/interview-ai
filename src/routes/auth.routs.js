const {Router} = require('express');
const authController=require('../controllers/auth.controller');
const authMiddleware=require('../middlewares/auth.middleware');

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register',authController.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post('/login',authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @desc Logout a user clear token from the cookie and add to blacklist                                                                                                                            
 * @access Public                                                                                                                                                            
 */
authRouter.get('/logout',authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @desc Get current user details
 * @access Private
 */
authRouter.get('/get-me',authMiddleware.authUser,authController.getMeController);

module.exports = authRouter;