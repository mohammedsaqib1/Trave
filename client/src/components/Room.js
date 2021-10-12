import React from 'react'

function Room({room}) {
    return (
        <div>
            <div className="row boxshadow">
                <div className="col-md-4">
                    <img src={room.imageurls[0]} className="smallimg" />
                </div>
                <div className="col-md-7 roomproperties">
                    <b>
                    <h1>{room.name}</h1>
                    <p>Max count : {room.maxcount}</p>
                    <p>Phone Number : {room.phonenumber}</p>
                    <p>Type : {room.type}</p>
                    </b>
                    <div style={{float :'right'}}>
                        <button className="btn btn-gradient btn-lg">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room