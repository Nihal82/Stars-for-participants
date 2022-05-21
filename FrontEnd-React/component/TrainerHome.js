import React ,{useState,useEffect}from 'react';

import { Link } from "react-router-dom";
import {Form,Row,Col,Navbar,Container,Button} from 'react-bootstrap'
import TraineeForm from "./TraineeForm";
import RaiseRequest from './RaiseRequest';
import TrainerRating from './TrainerRating';
// import image from './path-to-image';
import profile from "./profile.jpg";


import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
  } from './NavbarElements';




export default function TrainerHome(props){ 
    const [user,setUser] = useState("");
   
    const Logout = ()=>{
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("userType");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("email");
      window.location='./'
    }
   

return (


<>

        <Navbar className="bg-dark">
  <Container>
    <Navbar.Brand className="text-white" href="#home">Stars For Participant</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
    <Form className='d-flex justify-content-end'> 
    <Form.Group as={Row} required className="mb-3"  controlId="formGender">
    
            
            <Col className='mt-2'>
            
            <NavLink to="/viewTrainerRequest">
              <Button type='button' className="btn btn-info btn-lg" id={`Admin`} label="Admin" name="user"
           
            onClick={(e)=>setUser(e.target.value)} value="Admin"> View Request </Button></NavLink>
            </Col>
       
           
            <Col className='mt-2'>
            <NavLink className='btn btn-info btn-lg' to='/TrainerRaiserequest' activeStyle>
            Raise Request
          </NavLink>
            </Col>

            <Col className='mt-2'>
            <NavLink className='btn btn-info btn-lg' to='/ViewAssignedTrainerRequest' activeStyle>
          Assigned Requests
          </NavLink>
            </Col>



            <Col className='mt-2'>
            <Button className=' btn btn-danger btn-lg' onClick={Logout} > Logout </Button>
            </Col>

                 
      </Form.Group>
      
      <Col className='mt-2'>
            <Link to="/Profile_page"><img src={profile} alt="Logo" className='profile' height="40" width="40" /></Link>
      </Col>
        </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
<center>
<h1 ><b class="text-black">Welcome , {sessionStorage.getItem("name")}</b></h1>
</center>
        
    </>
    
    );
};


