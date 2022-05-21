import React, { Component} from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";


export default class UserLogIn extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      showForgetUserIdShow: false,
      showForgetPasswordShow: false,
      errors:{}
    };
  }
  handleValidations = () =>{
    let errors = {};
    let formIsValid = true;
    
    if (typeof this.state.email !== "undefined") {
        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
           
          }    
    }
    if (typeof this.state.pass !== "undefined") {
      if (!this.state.pass) {
          formIsValid = false;
        
          errors["pass"] = "Cannot be empty";
        }    
  }
    this.setState({errors:errors});
    return formIsValid;  
  }
  resetForm = () => {
    this.setState({
      email: "",
      pass: "",
      showForgetUserIdShow: false,
      showForgetPasswordShow: false,
      errors:{}
    })
 }

  buttonClick = async (e) => {
    e.preventDefault();
    if(this.handleValidations())
  {
//     let obj = {
//       id: 0,
// firstName: "string",
// lastName: "string",
// dob: "2022-05-13T04:50:44.168Z",
// contact: "string",
// gender: "string",
// usertype: "string",
// email: this.state.email,
// pass: this.state.pass,
// skills:""

//     }
    let obj = {
        id: 0,
        firstName: "string",
        lastName: "string",
        gender: "string",
        dob: "2022-05-15T09:48:25.657Z",
        email: this.state.email,
        contact: "string",
        usertype: "string",
        pass: this.state.pass,
        skills: ""
      }


      console.log("Loggin  Final object ")
      console.log(obj)
// --------Validating Form -----------
const data = await fetch("https://localhost:7134/api/Token",
      {
      method:"POST",
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify(obj)
      })
      .then(res=>res.json())
      .then(result=>result);
      if(data==="Invalid credentials"){
        this.resetForm();
        this.setState({errors:{pass:"Enter valid password or username"}})
      }
      else{
        console.log("no errors in post method")
        console.log(data)
        sessionStorage.setItem("token",data[0])
        sessionStorage.setItem("id",data[1])
        sessionStorage.setItem("userType",data[4])
        sessionStorage.setItem("name",data[3])
        sessionStorage.setItem("email",data[5])
        
        if(data[4]==="Trainee")
          window.location = "./TraineeHome"
          if(data[4]==="Admin")
          window.location = "./AdminHome"
          if(data[4]==="Trainer")
          window.location = "./TrainerHome"
      }
    }
   
  };
  render() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    return (
      <Form className="m-auto mt-12 my-auto justify-Content" style={{ width: "30%",height: "100vh"}}>
         <h1 className="text-center mb-4 text-dark margin-mt-5 pt-5" style={{width: "100%" }}>User Sign  In </h1>
        <Form.Group className="mb-3 col-12" controlId="formBasicEmail">
          <Form.Label>USER ID</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Email"
            value={this.state.adminid}
            name="email"
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
           <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
        </Form.Group>

        <Form.Group className="mb-3 col-12" controlId="formBasicPassword">
          <Form.Label>PASSWORD</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Password"
            value={this.state.pass}
            name="pass"
            onChange={(e) => {
              this.setState({ pass: e.target.value });
            }}
          />
            <span style={{ color: "red" }}>{this.state.errors["pass"]}</span>
        </Form.Group>
        <div className="row m-2">
          <Button
            className="col-4 btn-secondary rounded-pill"
            variant="dark"
            type="submit "
            onClick={this.buttonClick}
          >
            Login
          </Button>
          <div className="col-4"></div>
          <Button className="col-4 btn-secondary rounded-pill" variant="dark" type="reset" onClick={ ()=>window.location='./'}>
            Cancel
          </Button>
        </div>
        
      </Form>
    );
  }
}