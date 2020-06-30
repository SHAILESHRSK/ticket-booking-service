# Ticket Booking Service API

#### PROBLEM STATEMENT
    To Setup a NodeJS server on EC2 to handle ticketing for a bus company.
#### Context:
    1 bus, 40 seats. One ticket per seat.
#### Features from the server:
 - Update the ticket status (open/close + adding user details)
 - View all closed tickets
 - View Ticket Status
 - View all open tickets
 - View Details of person owning the ticket.
 - Additional API for admin to reset the server (opens up all the tickets)

# Postman Collection && API Documentation:
The API can be developed locally as well as on this [Heroku Dyno](https://ticket-booking-service-api.herokuapp.com/)

The detailed usage and Postman collection is available on:

https://documenter.getpostman.com/view/5400857/T17CDA89?version=latest

# Additional Notes:
- To run this `npm install` && `npm start`
- All parts are commented
- All handlers use a try-catch
- All responses are encoded in JSON
- Proper directory structure, eliminating any conflicts of interest
- `dotenv/config` for configuration management
- `express` is used as the application framework
- The database is MongoDB atlas server, with the credentials provided (since it's a private repo and also free tier)
- `mongoose` is used for database connections and schemas
- The API is also deployed on a Heroku Dyno (there were some issues with AWS Payment Authentication on my end)
