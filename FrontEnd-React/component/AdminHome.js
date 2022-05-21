import React ,{useState,useEffect}from 'react';

import { Link } from "react-router-dom";
import {Form,Row,Col,Navbar,Container,Button} from 'react-bootstrap'
import TraineeForm from "./TraineeForm";
import RaiseRequest from './RaiseRequest';
import TrainerRating from './TrainerRating';





const logout = ()=>{
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("userType");
  sessionStorage.removeItem("name");
  sessionStorage.removeItem("email");
  window.location='./'
  
}
export default function AdminHome(props){ 
return (
<>

        <Navbar className="bg-dark">
  <Container>
    <Navbar.Brand className="text-white " href="#home">Stars For Participant</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
    <Link to="/ViewAllTrainers">
      <Button type='button' className="btn btn-info  mx-2 btn-lg" id={`Trainer`} label="trainer" 
             value="Trainer"> All Trainer Details</Button></Link>
    <Link to="/ViewAllTrainerRequest"><Button type='button' className="btn btn-info mx-2 btn-lg" id={`Trainer`} label="trainer" 
             value="Trainer"> All Trainer Requests </Button></Link>

<Link to="/ViewAllStudentRequest"><Button type='button' className="btn btn-info  mx-2 btn-lg" id={`Trainer`} label="trainer" 
             value="Trainer"> All Student Requests </Button></Link>


             
    <Button className='float-end btn-danger mx-3 btn-lg' onClick={logout} > Logout </Button>
    
    </Navbar.Collapse>
  </Container>
</Navbar>
<center>
<h1 ><b class="text-white">Welcome , {sessionStorage.getItem("name")}</b></h1>
</center>
        
    </>
    
    );
};


