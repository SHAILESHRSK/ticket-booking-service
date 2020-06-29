const express = require('express')
const router = express.Router()

const { Ticket } = require('../models/ticket');
const { Passenger } = require('../models/passenger');

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
        const passengerData = await Passenger.findById(ticketData.passengerObj);
        if (passengerData) {
            return res.status(200).send(passengerData);
        }
        return res.status(404).send("Couldn't find the Required Ticket")
    } catch (err) {
        console.log(err)
        return res.status(400).send("An unknown error occured");
    }
})

module.exports = router