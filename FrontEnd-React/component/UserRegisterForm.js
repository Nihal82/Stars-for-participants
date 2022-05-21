import React, { useState } from "react";
import { Form, Button, Row, Col,option, } from "react-bootstrap";


import "bootstrap/dist/css/bootstrap.min.css";

import RegisterContactInfo from "./RegisterContactInfo";

export default function UserRegistrationForm(props) {
  const [errors, setErrors] = useState({});
  const [option, setOption] = useState("");
  const [details, SetDetails] = useState({
    first_name: "",
    last_name: "",
    Gender: "",
    ContactInfo: "",
    User: "",
    Password: "",
  });
    return (
    <>
      <div className="App d-flex flex-column align-items-center">
        <Form
          className="m-auto mt-5"
         
          style={{ width: "300px" }}
        >
          <Form.Group
            as={Row}
            className="mb-3"
            column
            sm="5"
            controlId="userInput"
          >
            <Form.Label>Trainee</Form.Label>
            <Form.Check
              type="radio"
              value="Trainee"
              id="Trainee"
              onChange={(e) => {
                props.setUser(e.target.value);
                SetDetails((details) => ({
                  ...details,
                  ...{ User: `${e.target.value}` },
                }));
              }}
              name="option"
            />
          </Form.Group>

          <Form.Group className="" controlId="userform">
            <Form.Label>Trainer</Form.Label>
            <Form.Check
              className="col"
              type="radio"
              value="Trainer"
              id="Trainer"
              onChange={(e) => {
                props.setUser(e.target.value);
                SetDetails((details) => ({
                  ...details,
                  ...{ User: `${e.target.value}` },
                }));
              }}
              name="option"
              required
            />
          </Form.Group>
        </Form>
       
       </div>
      
    </>
  );
}
