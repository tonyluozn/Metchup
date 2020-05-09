import React, { useState, useEffect } from "react";
import { Modal, Button,Col } from "react-bootstrap";
import {getUserByClass} from "../firebase"

export default function ClassModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); ClassContent(props);

    function ClassContent(props){
      console.log("props.name is "+props.name +", props.id is "+props.id);
      var userList = getUserByClass(props.id);
      console.log(userList);
      // userList.map(user=>{
      //   return(
      //   <p>user</p>
      //   )
      // });
    }
 

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
                <p>abc@u.northwestern.edu</p>
                <p>abc@u.northwestern.edu</p>
                <p>abc@u.northwestern.edu</p>
                <p>abc@u.northwestern.edu</p>
                <p>abc@u.northwestern.edu</p>
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