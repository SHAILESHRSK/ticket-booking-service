const express = require('express')
const router = express.Router()

const { Ticket } = require('../models/ticket');
const { Passenger } = require('../models/passenger');

//get passenger with a ticketid
router.get('/:ticketId', async (req, res) => {
    try {
        const { ticketId } = req.params;
        if (!ticketId) {
            return res.status(400).send("ticketId is missing");
        }
        const ticketData = await Ticket.findById(ticketId);
        if (!ticketData) {
            return res.status(404).send("Ticket doesn't exists");
        }
        const passengerData = await Passenger.findById(ticketData.passenger);
        if (passengerData) {
            return res.status(200).send(passengerData);
        }
    } catch (err) {
        return res.status(400).send("An unknown error occured");
    }
})

module.exports = router