import { response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/User.js'
import { generateJWT } from '../helpers/jwt.js';


export const registerUser = async( req, res = response ) => {

    const {  email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'The user already exists.'
            })
        };

        user = new User( req.body );

        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        // generate JWT
        const token = await generateJWT( user.id, user.name );

        return res.status(201).json({
            ok: true,
            uid: user.id,
            msg: `User registered: ${ user.name }`,
            token
        });
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            ok: false,
            msg: 'Error creating new user.'
        })
    }

};

export const loginUser = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // validate password
        const validPassword = bcrypt.compareSync( password, user.password );
    
        if ( !validPassword ) {
            return res.status(401).json({
                ok: false,
                msg: 'Wrong password.'
            })
        };

        // generate JWT
        const token = await generateJWT( user.id, user.name );
    
        return res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log( error );
        return res.status(400).json({
            ok: false,
            msg: 'Wrong credentials.'
        });
    };
};

export const renewToken = async( req, res = response ) => {

    const { uid, name } = req;

    // Generate new token
    const token = await generateJWT( uid, name );

    return res.json({
        ok: true,
        token
    });
};