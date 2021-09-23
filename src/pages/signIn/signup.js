import React, { useState } from "react";
import { FormGroup, Input, Col, Card, Row, Form, Button, Label } from "reactstrap";
import Response from "../../lib/Response";
import apiClient from "../../lib/apiClient";

const genderType = {
  'male': '1',
  'female': '0',
  'other': '2'
}
export default function SignUp({ setIsSignUpPage, gender, setGender }) {
  const [error, setError] = useState("");
  const [process, setProcess] = useState(false);
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  async function signUpHandler(e) {
    e.preventDefault();
    setError("");

    let updateAns = '';
    Object.keys(gender).filter(key => {
      if (gender[key] === true) {
        updateAns = key;
      }
      return true;
    });

    if (name.trim() === '') return forgotPassword(2, "Please enter your name");
    if (isNaN(parseInt(contactNumber)) || contactNumber.length !== 10) return forgotPassword(2, "Please enter your contact number");
    if (!genderType[updateAns]) return forgotPassword(2, "Please select your gender");
    if (country.trim() === '') return forgotPassword(2, "Please enter your country");
    if (address.trim() === '') return forgotPassword(2, "Please enter your address");
    if (password !== reEnteredPassword ) return forgotPassword(1, "Passwords are not matching");

    setProcess(true);
    const res = await apiClient("/signup", "POST", {
      'phone_no': contactNumber,
      'address': address,
      'user_name': name,
      'gender': genderType[updateAns],
      'country': country,
      'password': password 
    });

    if (res.responseCode === Response.STATUS_OK) {
      forgotPassword();
    } else {
      setError(res.responseMessage);
    }

    setProcess(false);
  }

  const onCheck = (id, checked) => {
    let updateAns = [];

    Object.keys(gender).filter(key => gender[key] = false);
    let UpdatedOptions = { ...gender, [id]: checked };

    Object.keys(UpdatedOptions).filter(key => {
      if (UpdatedOptions[key] === true) updateAns.push(key)
      return true;
    });

    if (updateAns.length === 0) return true;
    setGender(UpdatedOptions);
  }

    //function to handle forgot password, message will be shown for 1 second
    function forgotPassword(type, message) {
      let msg = resetPassword ? '': ([1, 2].includes(type) ? message : `Signed Up Successfully, Please Sign in.`);
      setResetPassword(msg);
      
      if (type === 1) setReEnteredPassword("");

      window.setTimeout(() => {
        if (msg === 'Signed Up Successfully, Please Sign in.') {
          setResetPassword('');
          setIsSignUpPage();
        }

        setResetPassword('');
      }, 2000);
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
         {resetPassword && <p className="mt-2 text-danger text-center">{resetPassword}</p>}
        </div>
        <Card body style={{ margin: '0 0 0 1.5rem',  'background-color': 'rgba(32, 52, 69, 0.4)' }}>
          <Form
            onSubmit={signUpHandler}
          >
            <div className="text-center pb-4">
              <h3 className="text-center" style={{color: "white"}}>PLEASE ENTER DETAILS</h3>
            </div>
            <hr />
            <FormGroup>
              <Label style={{color: "white"}} for="name">{"Name"}</Label>
              <Input
                name="name"
                type="string"
                placeholder="alexa john"
                onChange={(e) => { setName(e.target.value); }}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label style={{color: "white"}} for="number">{"Contact Number"}</Label>
              <Input
                name="number"
                type="string"
                placeholder="988 * * * * * * *"
                onChange={(e) => { setContactNumber(e.target.value); }}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label style={{color: "white"}} for="gender">{"Gender"}</Label>
            <FormGroup className="text-center" style={{color: "white"}}>
              <Input id='male' type="checkbox" name="checkbox1" onChange={(e) =>  onCheck(e.target.id, e.target.checked) } checked={gender['male']} />{'Male'}&emsp;&emsp;&emsp;
              <Input id='female' type="checkbox" name="checkbox2" onChange={(e) =>  onCheck(e.target.id, e.target.checked) } checked={gender['female']} />{'Female'}&emsp;&emsp;&emsp;
              <Input id='other' type="checkbox" name="checkbox3" onChange={(e) =>  onCheck(e.target.id, e.target.checked) } checked={gender['other']} />{'Other'}
            </FormGroup>
            </FormGroup>

            <FormGroup>
              <Label style={{color: "white"}} for="country">{"Country"}</Label>
              <Input
                name="country"
                type="string"
                placeholder="France"
                onChange={(e) => { setCountry(e.target.value); }}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label style={{color: "white"}} for="address">{"Address"}</Label>
              <Input
                name="address"
                type="string"
                placeholder="Street: 88 place de Miremont. City: Villeneuve-saint"
                onChange={(e) => { setAddress(e.target.value); }}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label style={{color: "white"}} for="password">{"Password"}</Label>
              <Input name="password" placeholder="Password" type="password" onChange={(e) => { setPassword(e.target.value); }} required/>
            </FormGroup>
            <FormGroup>
              <Label style={{color: "white"}} for="name">{"Please Confirm Password"}</Label>
              <Input name="password" type="password" placeholder="password" onChange={(e) => { setReEnteredPassword(e.target.value); }} required/>
            </FormGroup>
            <hr />
            <Button style={{'background-image': 'linear-gradient(to right, #25aae1, #6afacb, #30dd8a, #2bb673)', color: "black"}} type="submit" size="lg" block color="primary" className="border-0" disabled={process}>
              Sign Up
            </Button>
            <Button style={{'background-image': 'linear-gradient(to right, #25aae1, #6afacb, #30dd8a, #2bb673)', color: "black"}} onClick={(e) => {e.preventDefault();setIsSignUpPage()}} size="lg" block color="primary" className="border-0" disabled={process}>
              Login
            </Button>
            {error && <p className="mt-2 text-danger text-center">{error}</p>}
          </Form>
        </Card>
      </Col>
    </Row>
  );
}