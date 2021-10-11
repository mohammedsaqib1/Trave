import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, setError] = useState();
  useEffect(async () => {
    try {
      setloading(true);
      const data = (await axios.get("/api/rooms/getallrooms")).data;

      setrooms(data);
      setloading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setloading(false);
    }
  }, []);

  return (
    <div>
      <div className="row">
        {loading ? (
          <h1>loading....</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          rooms.map((room) => {
            return <div className="col-md-9">
                <Room room={room}/>
            </div>;
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
