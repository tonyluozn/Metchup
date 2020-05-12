import React, {useState } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { db} from "../firebase";
import "./Message.css";

export default function Message(props) {
//props:   sender,reciever 

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = props.location.query;

  async function handleSubmit(event) {
    event.preventDefault();
    if (content.trim() === '') {
        return
    }

    //const timestamp = moment()
    //    .valueOf()
    //    .toString()

    setIsLoading(true);

    db.collection("Messages").doc().set({
        content: content.trim(),
        //fix later 
        idFrom: user,
        idTo: 'andrewsu2023@u.northwestern.edu', 
        time:  ''//timestamp

    }).then(() => {
        console.log("User '" +user + "' sent '" + user +"'message"+content);
        props.history.push("/");
    })
    .catch(e => {
        console.error("Error storing data; " + e);
        alert(e);
        setIsLoading(false);
    });


  }
  function renderUserInfo() {

    return (
        <div class="User">
          <div class="user-info">
            <h5 class="course-title">Receiver: {user} </h5>
           // Display reciever's name, other info, and classes  
          </div>
        </div>
    );
  }
  function renderForm(){
    return (
        <div className="NewNote">
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="content">
              <FormControl
                value={content}
                componentClass="textarea"
                onChange={e => setContent(e.target.value)}
              />
            </FormGroup>

            <LoaderButton
              block
              type="submit"
              bsSize="large"
              bsStyle="primary"
              isLoading={isLoading}
            >
              Send
            </LoaderButton>
          </form>
        </div>
      );
  }

  return (
    <div className="Message">
      {renderUserInfo()}
      {renderForm()}
    </div>
  );
}