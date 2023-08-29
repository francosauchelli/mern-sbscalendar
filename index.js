import express from 'express';
import dotenv from 'dotenv/config.js';
import cors from 'cors';

import authRouter from './routes/auth.router.js';
import eventsRouter from './routes/events.router.js';
import { dbConnection } from './database/config.js';


const app = express();

// Conexión a base de datos
dbConnection();

// Cors
app.use(cors())

// Directorio Público
app.use( express.static('./public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/auth', authRouter );
app.use( '/api/events', eventsRouter );

app.get( '*', ( req, res ) => {
    res.sendFile( __dirname + '/public/index.html' );
});

app.listen( process.env.PORT , () => {
    console.log( `Servidor funcionando en puerto: ${ process.env.PORT }`);
});