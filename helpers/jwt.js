import jwt from 'jsonwebtoken';

export const generateJWT = ( uid, name ) => {

    console.log( uid, name )

    return new Promise(( resolve, reject ) => {

        const payload = {
            uid,
            name
        };

        jwt.sign( payload, process.env.JWT_SECRET_SEED, {
            expiresIn: '2h'
        }, ( error, token ) => {

            if( error ) {
                console.log( error );
                reject( 'Error generating token' )
            };
            
            resolve( token );
        });
    });
};