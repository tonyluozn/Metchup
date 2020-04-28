import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem, Modal, Button} from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container";

export default function ClassModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <ListGroupItem>
          <Container>
           <Row>
             <Col sm={9}> 
               <Button variant="outline-dark-lg" onClick={handleShow}  block>
                 {props.name}
               </Button>
             </Col>
             <Col sm={3}>
               <Button>
                 Delete
               </Button>
             </Col>
           </Row>
          </Container>
    
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
        </ListGroupItem>
        </>
      );
}