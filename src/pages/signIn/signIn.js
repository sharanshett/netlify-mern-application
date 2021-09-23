import React, { useState } from "react";
import { FormGroup, Input, Col, Card, Row, Form, Button, Label } from "reactstrap";
import Response from "../../lib/Response";
import apiClient from "../../lib/apiClient";

export default function SignIn({ onAccessTokenUpdate, setIsSignUpPage }) {
  let [error, setError] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");

  async function signInHandler(e) {
    e.preventDefault();
    setError("");

    // making the api call for login
    const res = await apiClient("/login", "POST", {
      'password': password,
      'phone_no': contactNumber
    });

    if (res.responseCode === Response.STATUS_OK) {
      //storing the accessToken in localStorage and react variable and redirect the route to main page
      onAccessTokenUpdate(res.responseData.access_token);
      localStorage.setItem("access_token", res.responseData.access_token);
      window.location.href = '/';
    } else {
      setError(res.responseMessage);
    }
  }

  return (
    <Row
      style={{
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgb(18, 59, 92)'
      }}>
      <Col md={6} lg={4}>
        <div className="text-center pb-4">
         <h3 className="text-center" style={{'font-weight': 'bold', color: "rgb(95, 186, 183)"}}>SIMPLE USER <br />  REGISTRATION</h3>
        </div>
        <Card body style={{ margin: '0 0 0 1.5rem',  'background-color': 'rgba(32, 52, 69, 0.4)' }}>
          <Form
            onSubmit={signInHandler}
          >
            <div className="text-center pb-4">
              <h3 className="text-center" style={{color: "white"}}>LOGIN</h3>
            </div>
            <hr />
            <FormGroup>
              <Label style={{color: "white"}} for="contactNumber">{"Contact Number"}</Label>
              <Input
                name="name"
                type="string"
                placeholder="988 * * * * * * *"
                onChange={(e) => { setContactNumber(e.target.value); }}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{color: "white"}} for="password">{"Password"}</Label>
              <Input name="password" placeholder="Password" type="password" onChange={(e) => { setPassword(e.target.value); }} />
            </FormGroup>
            <hr />
            <Button style={{'background-image': 'linear-gradient(to right, #25aae1, #6afacb, #30dd8a, #2bb673)', color: "black"}} type="submit" size="lg" block color="primary" className="border-0">
              Login
            </Button>
            <Button style={{'background-image': 'linear-gradient(to right, #25aae1, #6afacb, #30dd8a, #2bb673)', color: "black"}} onClick={(e) => {e.preventDefault();setIsSignUpPage()}} type="submit" size="lg" block color="primary" className="border-0">
              Sign Up
            </Button>
            {error && <p className="mt-2 text-danger text-center">{error}</p>}
          </Form>
        </Card>
      </Col>
    </Row>
  );
}