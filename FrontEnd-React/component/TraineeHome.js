import React ,{useState,useEffect}from 'react';
import { Link } from "react-router-dom";
import {Form,Row,Col,Navbar,Container,Button} from 'react-bootstrap'
import TraineeForm from "./TraineeForm";
import RaiseRequest from './RaiseRequest';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
  } from './NavbarElements';




export default function TraineeHome(props){ 
   
const Logout = ()=>{
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("userType");
  sessionStorage.removeItem("name");
  sessionStorage.removeItem("email");
  window.location='./'
}
   console.log("inside trainee home")
   console.log(sessionStorage.getItem("email"))// working

return (


<>
        <Navbar className="bg-dark">
  <Container>
    <Navbar.Brand className="text-white" href="#home"><h2>Stars For Participant</h2></Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
    <Form className='d-flex justify-content-end'> 
    <Form.Group as={Row} required className="mb-3"  controlId="formGender">
            
            <Col className='mt-2'>
            <NavLink className='btn btn-info btn-lg' to='/Raiserequest' >
            Raise Request
          </NavLink>
            </Col>
            <Col className='mt-2'>
            <NavLink className='btn btn-info btn-lg' to='/ViewRequestDetails'  >
            View Request
          </NavLink>
            </Col>
            
            <Col className='mt-2'>
            <NavLink className='btn btn-info btn-lg' to='/ViewAssignedTraineeRequest' >
          Assigned Requests
          </NavLink>
            </Col>




      </Form.Group>

{/* -----------LOGOUT----------- */}

<Form.Group as={Row} required className="mb-3"  controlId="formGender">
<Col className='mt-2'>
<Button className='float-end btn-danger mx-3 btn-lg' onClick={Logout}> Logout</Button>
</Col>
</Form.Group>
        </Form>

    </Navbar.Collapse>
  </Container>
</Navbar>

{/* <h1 >Welcome , {sessionStorage.getItem("name")}</h1> */}

    <div >
    <h1 >Welcome , {sessionStorage.getItem("name")}</h1>
    </div>
 


    </>
    
    );
};


