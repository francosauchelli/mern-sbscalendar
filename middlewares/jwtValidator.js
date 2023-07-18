import { request, response } from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = ( req = request, res = response, next ) => {

    const token = req.header( 'x-token' );

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Token does not exists.'
        })
    };

    try {
        
        const { uid, name } = jwt.verify(
            token,
            process.env.JWT_SECRET_SEED
        )

        req.uid = uid;
        req.name = name;


    } catch ( error ) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token.'
        });
    };


    next();
};