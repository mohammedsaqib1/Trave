import React, { useState, useEffect } from 'react'
import axios from "axios";
import StripeCheckout from 'react-stripe-checkout';
import Loader from '../components/Loader'
import Error from "../components/Error";
import moment from 'moment'
import { FunctionsRounded } from '@mui/icons-material';

function Bookingscreen({match}) {
    const [loading, setloading] = useState(true);
    const [error, setError] = useState();
    const [room, setroom] = useState();

    const roomid = match.params.roomid
    const fromdate = moment(match.params.fromdate,'DD-MM-YYYY');
    const todate = moment(match.params.todate,'DD-MM-YYYY');

    const totaldays = 1 + Math.ceil((todate - fromdate) / (1000 * 60 * 60 * 24));
    const [totalamount , settotalamount] = useState()

    useEffect(async () => {
        try {
            setloading(true);
            const data = (
                await axios.post("/api/rooms/getroombyid", 
                { roomid: match.params.roomid 
            })
            ).data;

            settotalamount(data.rentperday * totaldays)
            setroom(data);
            setloading(false);
        } catch (error) {
            setloading(false);
            setError(true);
        }

    }, []);

async function onToken(token){

        console.log(token);
        const bookingDetails = {
            room,
            userid:JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        };

        try {
            const result = await axios.post('/api/bookings/bookroom' , bookingDetails)
        } catch (error) {
            
        }
    
    }

    return(
        <div className="m-5">

            {loading ? (<Loader/>) : room ? (<div>
                <div className="row justify-content-center mt-5 boxshadow" >
                    <div className="col-md-6" >
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className="bigimg" ></img>
                    </div>
                    <div className="col-md-6" >
                        <div style={{ textAlign: "right" }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>From Date : {match.params.fromdate} </p>
                                <p>To Date : {match.params.todate} </p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total Days : {totaldays} </p>
                                <p>Rent Per Day : {room.rentperday}</p>
                                <p>Total Amount : {totalamount}</p>
                            </b>
                        </div>
                        <div>
                            
                            <StripeCheckout
                            amount={totalamount*100}
                            token={onToken}
                            currency='INR'
                            stripeKey="pk_test_51Jk5DnSIXQi3PHtzzvUkgpCwyvANKFWIq46FBnmNJtvLDDscXfMkVKSb2NoP6ysNJuJ4HHm7yyqyNiVaofeKghnH00p4PUQm50"
                            >
                            <button style={{ float: "right" }}
                            className="btn btn-gradient mt-5 pay-now-btn">
                            Pay Now
                            </button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            </div>) : (<Error/>) 
            }
        </div>
    );
    
}

export default Bookingscreen