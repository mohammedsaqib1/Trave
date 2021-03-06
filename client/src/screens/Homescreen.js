import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css'; 
import moment from 'moment'

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, setError] = useState();
  const [fromdate, setfromdate] = useState()
  const [todate, settodate] = useState()
  const [duplicaterooms, setduplicaterooms] = useState([])
  const [searchkey, setsearchkey] = useState('')
  const [type, settype] = useState('all')
  useEffect(async () => {
    try {
      setloading(true);
      const data = (await axios.get("api/rooms/getallrooms")).data;

      setrooms(data);
      setduplicaterooms(data)
      setloading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setloading(false);
    }
  } , []);
  
  function filterByDate(dates){
    setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
    settodate(moment(dates[1]).format('DD-MM-YYYY'))
    var temprooms = []
    var availability = false
    for (const room of duplicaterooms) {

      if (room.currentbookings.length > 0) {

        for (const booking of room.currentbookings) {

          if (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
            && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
          ) {

            if (
              moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
            ) {
              availability = true
            }

          }

        }

      }

      if (availability == true || room.currentbookings.length == 0) {
        temprooms.push(room)
      }

      setrooms(temprooms)

    }
  } 
  function filterBySearch(){
    const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temprooms)
  }
  
  function filterByType(e){
  
    settype(e)
  
    if (e!=="all"){
      const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
      setrooms(temprooms)
    }
    else{
      setrooms(duplicaterooms)
    }
  }

  return (
    <div className="container" style={{paddingTop:'80px'}}>
      
      <div className="row mt-5 boxshadow" style={{display: 'block'}}>
        <div style={{  display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'}}>
        <div className="col-md-3 mr-5">
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="search rooms"
          value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch} />
        </div>

        <div className="col-md-3">
        <select className="form-control" value={type} onChange={(e)=>{filterByType(e.target.value)}} >
          <option value="all" >All</option>
          <option value="delux" >Delux</option>
          <option value="non-delux" >Non-Delux</option>
        </select>
        </div>
      </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader/>
        ) : (
          rooms.map((room) => {
            return <div className="col-md-12 mt-2 w-100">
                <Room room={room} fromdate={fromdate} todate={todate}/>
            </div>;
          })
        )
        }
      </div>
    </div>
  );
}

export default Homescreen;
