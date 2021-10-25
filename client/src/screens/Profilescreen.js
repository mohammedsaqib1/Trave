import React, {useState, useEffect} from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader'
import Error from "../components/Error";
import Swal from 'sweetalert2'
import { Tag, Divider } from 'antd';

const { TabPane } = Tabs;

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {
       
        if(!user){
            window.location.href='/login'
        }
        
    }, [])

    return (
        <div className="ml-3 mt-5 pb-5 pt-5">
            <Tabs defaultActiveKey="1" className="mt-5">
                <TabPane tab="Profile" key="1">
                    <h1>My Profile</h1>
                    <br/>
                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>isAdmin: {user.isAdmin ? "YES" : "NO"}</h1>

                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings/>
                </TabPane>
                
            </Tabs>
        </div>
    )
}

export default Profilescreen;

export function MyBookings(){
    
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    useEffect( async () => {
       
        try {
            setloading(true)
            const data = await (await axios.post('/api/bookings/getbookingsbyuserid', {userid : user._id})).data
            console.log(data); 
            setbookings(data)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)
        }

    }, [])

    async function cancelBooking(bookingid, roomid){

        try {
            setloading(true)
            const result = await (await axios.post("/api/bookings/cancelbooking", {bookingid, roomid})).data
            console.log(result)
            setloading(false)
            Swal.fire('Congrats', 'Your booking has been cancelled', 'success').then(result=>{
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('Oops', 'Something went wrong', 'error')
        }


    }

    return(
        <div>
            <div className="row">
                <div className="col-md-6 pl-5 pb-5">
                    {loading && (<Loader/>)}
                    {bookings && (bookings.map(booking=>{
                        return <div className="boxshadow">
                            <h1>{booking.room}</h1>
                            <p><b>BookingId</b> : {booking._id}</p>
                            <p><b>Check-In</b> : {booking.fromdate}</p>
                            <p><b>Check-Out</b> : {booking.todate}</p>
                            <p><b>Amount</b> : {booking.totalamount}</p>
                            <p><b>Status</b> : {""}
                            {booking.status == 'cancelled' ? <Tag color="red">CANCELLED</Tag> : <Tag color="green">CONFIRMED</Tag> }</p>

                            {booking.status !== 'cancelled' && (
                                <div className="text-right">
                                <button class="btn btn-gradient" onClick={()=>{cancelBooking(booking._id, booking.roomid)}} >CANCEL BOOKING</button>
                                </div>
                            )}

                            
                        </div>
                    }))}

                </div>
            </div>
        </div>
    )

}