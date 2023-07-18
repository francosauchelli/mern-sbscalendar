/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

import { Router } from 'express';
import { check } from 'express-validator';

import { loginUser, registerUser, renewToken } from '../controllers/auth.js';
import { fieldsValidator } from '../middlewares/fieldsValidator.js';
import { validateJWT } from '../middlewares/jwtValidator.js';


const router = Router();


// register
router.post( 
    '/register',
    [
        // Middlewares
        check( 'name', 'The name is mandatory.' ).not().isEmpty(),
        check( 'email', 'You must enter a valid email.' ).isEmail(),
        check( 'password', 'The password must contain at least 6 letters.' ).isLength({ min: 6 }),
        fieldsValidator
    ],
    registerUser
);


// login
router.post( '/',
    [
        check( 'email', 'You must enter a valid email.' ).isEmail(),
        check( 'password', 'The password must contain at least 6 letters.' ).isLength({ min: 6 }),
        fieldsValidator
    ],
    loginUser
);


// Renew token
router.get( '/renew', validateJWT, renewToken );

export default router;