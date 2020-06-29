//MODULE IMPORTS
const express = require('express')
const jwt = require('jsonwebtoken');

//MODULE IMPORTS
const { Ticket } = require('../models/ticket')
const { Passenger, validatePassenger } = require('../models/passenger')

const auth =  function (req, res, next){
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).send('Access Denied. No token provided');
    }
    try{
      const decoded = jwt.verify(token, "jwtPrivateKey");
      req.user = decoded;
      next();
    }
    catch(err){
       return res.status(403).send("Access denied. Try the token again");
    }
}

const adminCheck = function (req, res, next) {
    if (!req.user.isAdmin) 
        return res.status(403).send('Access denied.');
    next();
}

router.post('/create', async (req, res) => {
    try {
        const { error } = validatePassenger(req.body.passenger);
        if (error || parseInt(req.body.seatID) > 40) {
            return res.status(400).send("Invalid input");
        }

        let exists = await Ticket.findOne({
            isBooked: true,
            seatID: req.body.seatID
        });
        if (exists) {
            return res.status(400).send("The seat you are looking for is already booked");
        }

        const ticket = new Ticket()

        console.log(req.body.passenger)
        const passenger = new Passenger(req.body.passenger);
        const passengerData = await passenger.save();
        if (passengerData) {
            ticket.seatID = req.body.seatID
            ticket.passengerObj = passenger._id;
            const ticketData = await ticket.save();
            if (ticketData) {
                res.status(200).send(ticketData);
            }
        }
    } catch (err) {
        return res.status(403).send("An unknown error occured");
    }
});

router.get('/viewOpen', async (req, res) => {
    try {
        const data = await Ticket.find({
            isBooked: false
        }).limit(10).select({
            __v: 0
        });
        return res.status(200).send(data);
    } catch {
        return res.status(400).send("An unknown error occured");
    }
})

router.get('/viewClosed', async (req, res) => {
    try {
        const data = await Ticket.find({
            isBooked: true
        }).limit(10).select({
            __v: 0
        });
        return res.status(200).send(data);
    } catch {
        return res.status(400).send("An unknown error occured");
    }
})

router.get('/:ticketId', async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticketData = await Ticket.findById(ticketId);
        if (ticketData) {
            return res.status(200).json({
                status: ticketData.isBooked
            });
        }
    } catch (err) {
        res.status(404).json({
            message: err
        });
    }
})

router.put('/:ticketId', async (req, res) => {
    try {
        const ticketId = req.params.ticketId || null;
        const requestData = req.body;
        let passenger = requestData.passenger || null;

        if (requestData.isBooked == true) {
            let ticketData = await Ticket.findById(ticketId);
            if (ticketData) {
                const passengerId = ticketData.passengerObj;
                const deleteData = await Passenger.remove({
                    _id: passengerId
                });
                if (deleteData) {
                    ticketData.isBooked = requestData.isBooked;
                    const result = await ticketData.save();
                    return res.status(200).json(result);
                }
            }
        }
        if (requestData.isBooked == false && passenger != null) {
            let ticketData = await Ticket.findById(ticketId);
            if (!ticketData) {
                return res.status(404).json({
                    message: "Not found"
                });
            }
            const passengerData = new Passenger(passenger);
            const passengerSaved = await passengerData.save();
            if (passengerSaved) {
                ticketData.passenger = passengerSaved._id;
                ticketData.is_booked = requestData.isBooked;
                const ticketSaved = await ticketData.save();
                return res.status(200).send(ticketSaved);
            }
        }
    } catch (err) {
        return res.status(400).send("Already updated with the same details");
    }
});

router.post('/reset', [auth, adminCheck], async (req, res) => {
    try {
        await Ticket.update({}, {
            $set: {
                isBooked: false
            }
        }, {
            multi: true
        });
        return res.status(200).json({
            message: "updation successful"
        });
    } catch (err) {
        return res.status(404).send("reset request cannot be proceed right now. Try again later");
    }
})

module.exports = router;