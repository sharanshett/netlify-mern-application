import React from 'react';
import { Input, Modal, ModalBody, ModalHeader, Form, Col, FormGroup, Button, Label } from 'reactstrap';

const genderList = {
  1: "Male",
  0: "Female"
}

export default function DetailsModal(props) {

  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggle}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader toggle={props.toggle}>
          User Details
      </ModalHeader>
      <ModalBody>
          <Form onSubmit={props.toggle}>
            <FormGroup row>
              <Label for="name" sm={4}>First Name</Label>
              <Col lg>
              <Input type="string" value={props.userDetails.user_name} name="name" id="name" disabled/>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="contact" sm={4}>Contact Number</Label>
              <Col lg>
              <Input type="string" value={props.userDetails.contact} name="contact" id="contact" disabled/>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="gender" sm={4}>Gender</Label>
              <Col lg>
              <Input type="string" value={genderList[props.userDetails.gender] ? genderList[props.userDetails.gender] : "Other"} name="gender" id="gender" disabled/>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="country" sm={4}>Country</Label>
              <Col lg>
              <Input type="string" value={props.userDetails.country} name="country" id="country" disabled/>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="address" sm={4}>Address</Label>
              <Col lg>
              <Input type="string" value={props.userDetails.address} name="address" id="address" disabled/>
              </Col>
            </FormGroup>
            <br/>
            <FormGroup style={{"textAlign": "center"}}>
            <Col  sm={90}>
              <Button color="primary" onClick={(e) => {e.preventDefault();props.toggle()}}>Close</Button>
              </Col>
            </FormGroup>
          </Form>
      </ModalBody>
    </Modal>
  );
}