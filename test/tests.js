let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

//open issue -- https://github.com/chaijs/chai-http/issues/170

chai.use(chaiHttp);chai.use(chaiHttp);

describe("TicketBooking", function(){
    describe ("Create Endpoint", () => {
        var seats = [{
            "seatID": 12,
            "passenger": {
                "name": "Chaman",
                "sex": "M",
                "age": 52,
                "email": "karaf@gmail.com"
            }
        }, {
            "seatID": 19,
            "passenger": {
                "name": "Mr. a Huffle Puff",
                "sex": "M",
                "age": 52,
                "email": "karafasfssfaa@gmail.com"
            }
        }]

        it("Multiple Creation", (done) => {
            chai.request(server)
                .get('/viewOpen')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(seatsEmail.length);
                done();
              });
        })

        var seatsEmail = [{
            "seatID": 22,
            "passenger": {
                "name": "Chaman",
                "sex": "M",
                "age": 52,
                "email": "karafasfaa@gmail.com"
            }
        }, {
            "seatID": 29,
            "passenger": {
                "name": "Mr. a Huffle Puff",
                "sex": "M",
                "age": 52,
                "email": "karafasfaa@gmail.com"
            }
        }]

        it("Creation with Duplicate Email", (done) => {
            for (var i=0; i<seatsEmail.length; i++) {
                chai.request('http://localhost:5000')
                    .post("/create")
                    .send(seatsEmail[i])
                    .end((_, res) => {
                        res.should.have.status(400);
                        
                    })
            }
            done();
        })

    })
})
