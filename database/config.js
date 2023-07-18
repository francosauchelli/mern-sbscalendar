import mongoose from "mongoose";


export const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DB_CNN + 'sbscalendar' );
        console.log( 'On Line' );

    } catch ( error ) {
        console.log( error );
        throw new Error( 'Could not connect to database.' );
    }
};