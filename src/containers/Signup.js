import React, { useState } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";
import { Auth, db } from "../firebase"

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.name.length > 0 &&
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  // Helper function for creating user data. 
  function createUserData() {
    db.collection("Users").doc(fields.email).set({
      name: fields.name,
      classes: [null, null, null, null, null, null]
    }).then(() => {
      console.log("User '" +fields.name + "' created with email '" + fields.email +"'");
      props.history.push("/");
    })
    .catch(e => {
      console.error("Error storing data; " + e);
      alert(e);
      setIsLoading(false);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
  
    Auth.createUserWithEmailAndPassword(fields.email, fields.password)
    .then(createUserData)
    .catch(e => {
      console.error("Error creating user; " + e);
      alert(e);
      setIsLoading(false);
    });
    // 确认邮箱之类的放弃了
  }
  
  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            type="name"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="Signup">
      {//newUser === null ? renderForm() : renderConfirmationForm()
        renderForm()
      }
    </div>
  );
}