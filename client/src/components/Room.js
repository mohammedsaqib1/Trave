import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { Modal, Button, Carousel} from 'react-bootstrap'
function Room({ room , fromdate , todate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
            <p>Type : {room.type}</p>
          </b>
          <div style={{ float: "right" }}>
          {(fromdate && todate) && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className="btn btn-gradient btn-lg m-2">Book Now</button>
            </Link>)}
            <button className="btn btn-gradient btn-lg" onClick={handleShow}>
              View Details
            </button>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>{room.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel prevLabel="" nextLabel="">
              {room.imageurls.map((url) => {
                return (
                  <Carousel.Item>
                    <img
                      className="d-block w-100 bigimg"
                      src={url}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <p>{room.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="btn" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Room;
