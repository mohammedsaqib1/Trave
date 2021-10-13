import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loader from '../components/Loader'
import Error from "../components/Error";

function Bookingscreen({match}) {
    const [loading, setloading] = useState(true);
    const [error, setError] = useState();
    const [room, setroom] = useState();

    useEffect(async () => {
        try {
            setloading(true);
            const data = (await axios.post("/api/rooms/getroombyid", { roomid: match.params.roomid })).data;

            setroom(data);
            setloading(false);
        } catch (error) {
            setloading(false);
            setError(true);
        }

    }, []);

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
                                <p>Name : </p>
                                <p>From Date : </p>
                                <p>To Date : </p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total Days : </p>
                                <p>Rent Per Day : {room.rentperday}</p>
                                <p>Total Amount : </p>
                            </b>
                        </div>
                        <div>
                            <button style={{ float: "right" }}
                                className="btn btn-gradient btn-lg " >
                                Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>) : (<Error/>) 
            }
        </div>
    );
    
}

export default Bookingscreen
//     

//     return (
        

//     )