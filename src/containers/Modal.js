import React, { useState, useEffect } from "react";
import { Modal, Button,Col } from "react-bootstrap";

export default function ClassModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
          <Button variant="outline-dark-lg" onClick={handleShow}>
            {props.name}
          </Button>
         
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{props.name} Class Info</Modal.Title>
            </Modal.Header>
              <Modal.Body>
                <p>a@u.northwestern.edu</p>
                <p>b@u.northwestern.edu</p>
                <p>c@u.northwestern.edu</p>
                <p>d@u.northwestern.edu</p>
                <p>e@u.northwestern.edu</p>
                <p>f@u.northwestern.edu</p>
                <p>g@u.northwestern.edu</p>
                <p>h@u.northwestern.edu</p>
              </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Join the group
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}