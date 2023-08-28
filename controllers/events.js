import { response } from 'express';

import { Event } from '../models/Events.js';


export const getEvents = async( req, res = response ) => {


    const events = await Event.find()
                            .populate( 'user', 'name' );

    res.json({
        ok: true,
        events
    });
};

export const createEvent = async( req, res = response ) => {

    let event = new Event( req.body );

    console.log({ event })


    try {

        event.user = req.uid;
        const savedEvent = await event.save();
        
        res.json({
            ok: true,
            event: savedEvent
        });

        
    } catch ( error ) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error creating the event. Please contact the administrator'
        });
    };
};

export const updateEvent = async( req, res = response ) => {

    const eventId = req.params.id;

    try {
        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'The event you are trying to modify is non-existent.'
            });
        };

        if( event.user.toString() !== req.uid ){
            return res.status(401).json({
                ok: false,
                msg: 'You do not have privileges to modify this event.'
            });
        };

        const newEvent = {
            ...req.body,
            user: req.uid
        };

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.json({
            ok: true,
            event: updatedEvent
        });

        
    } catch (error) {
        console.log( error );

        res.status(500).json({
            ok: false,
            msg: 'Error udpating event.'
        });
    };


};

export const deleteEvent = async( req, res = response ) => {

    const eventId = req.params.id;

    try {
        const event = await Event.findById( eventId );

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'The event you are trying to delete does not exist.'
            });
        };

        if( event.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have privileges to delete this event.'
            });
        };

        await Event.findByIdAndDelete( eventId );
        
        res.json({
            ok: true,
            msg: `Event id: ${ eventId } succesfuly deleted.`
        });

    } catch (error) {
        console.log( error );

        res.status(500).json({
            ok: false,
            msg: 'Error deleting the event.'
        });
    }
};