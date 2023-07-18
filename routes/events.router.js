/*
    Rutas de eventos / Events
    host + /api/events
*/

import { Router } from 'express';
import { check } from 'express-validator';

import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers/events.js';
import { validateJWT } from '../middlewares/jwtValidator.js';
import { fieldsValidator } from '../middlewares/fieldsValidator.js';
import { isDate } from '../helpers/isDate.js';


const router = Router();

// middleware to all routes
/*
    si quiero que el middleware se aplique a algunas de las rutas, 
    sólo debo colocal el router.use( middleware ) en una línea 
    por debajo de las que no quiero que lo validen
*/
router.use( validateJWT );

// get events
router.get( '/', getEvents );

// create new events
router.post(
    '/', 
    [
        check( 'title', 'Title is required' ).notEmpty(),
        check( 'start', 'Must indicate start date.' ).custom( isDate ),
        check( 'end', 'Must indicate end date.' ).custom( isDate ),
        fieldsValidator
    ],
    createEvent
);

// update event
router.put( '/:id', updateEvent );

// delete event
router.delete( '/:id', deleteEvent );


export default router;