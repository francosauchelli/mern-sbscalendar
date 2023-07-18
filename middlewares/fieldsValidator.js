import { response } from 'express';
import { validationResult } from 'express-validator';


export const fieldsValidator = ( req, res = response, next ) => {
    
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status( 400 ).send({
            ok: false,
            errors: errors.mapped()
        })
    };

    next();
};