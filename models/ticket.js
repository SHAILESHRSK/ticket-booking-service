const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    isBooked: { 
        type: Boolean, 
        default: true 
    },
    seatID: { 
        type: Number, 
        min: 1,
        max: 40, 
        required: true 
    },
    date: {
        type: Date, 
        default: Date.now() 
    },
    passengerObj:{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Passenger'
    }
})

module.exports = {
    Ticket: mongoose.model('ticket', ticketSchema),
}