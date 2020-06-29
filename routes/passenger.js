//MODULE IMPORTS
const express = require('express')

//MODEL IMPORTS
const { Ticket } = require('../models/ticket');
const { Passenger } = require('../models/passenger');

//ROUTER OBJECT INIT
const router = express.Router()

//USER DETAILS FROM TICKETID {GET}
router.get('/:ticketId', async (req, res) => {
    try {
        //Check if ticketId was passed correctly
        const { ticketId } = req.params;
        if (!ticketId) {
            return res.status(400).json({"message":"TicketID input is missing!"});
        }

        //Get ticket from ticketId in Atlas Cluster
        const ticketData = await Ticket.findById(ticketId);
        if (!ticketData) {
            return res.status(404).json({"message":"Ticket doesn't exist!"});
        }

        //Get passengerData from ticketData in Atlas Cluster
        const passengerData = await Passenger.findById(ticketData.passengerObj);
        if (passengerData) {
            return res.status(200).send(passengerData);
        }

        //Respond with 404 if passenger could not be found
        return res.status(404).json("Passenger could not be found!")
    } catch (err) {
        console.log("ERROR:: ", err);
    }
})

module.exports = router