import React,{useState} from "react";
import { Link } from "react-router-dom";
import {Form,Row,Col,Navbar,Container,Button} from 'react-bootstrap'
import { useEffect } from "react";
import UserLogIn from "./UserLogIn";
import TrainerForm from "./TrainerForm";
import TraineeForm from "./TraineeForm";
import Content from "./Content"

const Homepage = () =>{
    
    const [showcontent,setShowContent]= useState(true)
    const resetapp =()=>{
        
        sessionStorage.clear();
    }
    // console.log(generatePassword())
    const [user,setUser] = useState("");
    useEffect(()=>{
        if(user==="Admin")
        {
            <UserLogIn />
        }
    })
    let check;
    let content;
    if (showcontent){
        content= <Content />
    
    }
    if(user==="Admin")
    {
      check =  <UserLogIn />
      content= <p></p>
      
    }
    else if(user==="Trainer"){
        check = <TrainerForm />
        content= <p></p>
        
    }
    else if(user==="Trainee"){
        check = <TraineeForm />
        content= <p></p>
       
    }
    
    else{
        
    }
    return(
    <>
    {resetapp()}
        <Navbar className="bg-dark">
  <Container>
    <Navbar.Brand className="text-white" href="#home" ><h2>Stars For Participant</h2></Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
    <Form className='d-flex justify-content-end'> 
    <Form.Group as={Row} required className="mb-3" controlId="formGender">
            <Col className='mt-2'>
            <Button type='button' className="btn btn-info btn-lg"   id={`Admin`} label="Admin" name="user"
            defaultChecked={user === "Admin"} 
            onClick={(e)=>setUser(e.target.value)} value="Admin"> Admin/User SignIN </Button>
            </Col>
            <Col className='mt-2'>
            <Button type='button' className="btn btn-info btn-lg"  id={`Trainer`} label={`Trainer`} name="user"
            defaultChecked={user === "Trainer"} 
            onClick={(e)=>setUser(e.target.value)} value="Trainer"> Register - Trainer </Button>
            </Col>
            <Col className='mt-2'>
            <Button type='button' className="btn btn-info btn-lg" id={`Trainee`} label={`Trainee`} name="user"
            defaultChecked={user === "Trainee"} 
            onClick={(e)=>setUser(e.target.value)} value="Trainee"> Register - Trainee </Button>
            </Col>
      </Form.Group>
        </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
        {
           check
        }

{
content

}
        


    </>
    
    );
};
export default Homepage;