import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "../firebase";
import LoaderButton from "../components/LoaderButton";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
  
    Auth.signInWithEmailAndPassword(email, password)
    .catch(err => alert(err));
  }
  //console是测试用的
  Auth.onAuthStateChanged(user => {
    if (user) {
      console.log("Logged in as" + user.email);
      props.history.push("/");
      //如何跳转页面？
    } else {
      console.log("Logged out");
    }
  })

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
           <LoaderButton
             block
             type="submit"
             bsSize="large"
             isLoading={isLoading}
             disabled={!validateForm()}
            >
            Login
            </LoaderButton>
      </form>
    </div>
  );
}