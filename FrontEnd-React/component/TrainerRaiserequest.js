import React ,{useState,useEffect}from 'react';
import {Form,Button,Row,Col,Alert} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TrainerHome from './TrainerHome'
export default function RaiseRequest(props){ 
const [skills,setSkills]=useState([]);
   useEffect(()=>{
     var temp= sessionStorage.getItem("id");
     var result =  fetch("https://localhost:7134/api/Users/api/skill?id="+temp)
     .then((response)=>response.json())
     .then((data)=>{
       setSkills(data)
       console.log("loggin skills data from fetch")
       console.log(data)
       console.log("loggin skills state from fetch after assigning ")
       console.log(skills)
     });
   },[]);
  const notifysucess = () => { toast.success("Request Sent Sucessfully")};
  const notifyerrors= ()=>{ toast.error("ERRORS IN FORM PLEASE CHECK")}
  const [skill,setSkill]=useState("Select-Option");
  const [startDate,setStartDate]=useState("") 
  const [venues,setVenue]=useState("online");
  const [times,setTime]=useState("");
    
  const arr= []
  const [errors , setErrors] = useState({}); 
  const checktoday = (data)=>{
    const today = new Date();
    const entered= new Date(data);
    let diff = today.getFullYear() - entered.getFullYear();
    const m = today.getMonth() - entered.getMonth();
    const d = today.getDate()- entered.getDate()
    if (m < 0 || (m === 0 && today.getDate() < entered.getDate())  )
    {
      return false;
    }
    return true;
  }
  

const validateForm = ()=>{
    const newErrors = {};
    if(!times || times===''){
        newErrors.times=" Please Enter time "
    }
if(!startDate || startDate===''){
    newErrors.startDate="This is mandatory field"
}
if(!checktoday(startDate)){

}
else{
  newErrors.startDate="Date Cannot be from the past"
}


console.log("before skill validation")
console.log(skill)
console.log(!skill==='Select----Skill')
if(skill==="Select-Option"){
  newErrors.skill="Please select an option from below"
console.log("insise skill error assignment")
}
console.log("inside validatin form in raise request ")
        return newErrors
    }
//   -------------------------------Handle Submit-------------------------------------------
const  handleSubmit =  e =>{
    e.preventDefault();
    const formErrors= validateForm();
    console.log("Logging form error below")
    console.log(formErrors)
if(Object.keys(formErrors).length>0){
    setErrors(formErrors)
    {notifyerrors()}
}
else {
    setErrors({})
    let obj = {
        id: 0,
        temail: sessionStorage.getItem("email"),
        venue : venues,
        startdate:startDate,
      student:"notassigned",
        time:times,
        stuassigned:"no",
        skill:skill,
        rating:0,
        semail:"notassigned"
      };
// ------------POSTING DATA ----------------
fetch(
  "https://localhost:7134/api/TrainerRaiseRequests",

  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }
)
  .then((res) => res.json())
  .then((result) => console.log(result));
  {notifysucess()}


  setTimeout(8000)
  window.location='/TrainerHome'
console.log("Loggin json object ")
console.log(obj)
console.log("inside else block after form validation in raise request loggin form below")
}
}
return (<>
<TrainerHome/>
<Form className='m-auto mt-5' style={{width:"40%"}}> 
<Form.Group as={Row} className="mb-3" controlId="formUserType">
<Form.Label className="text-white" column sm="5"><b className="text-white">
    Subject</b>
</Form.Label>
<Col sm="7">
  {/* ---------------------Skill Check --------------- */}
    <Form.Select isInvalid={!!errors.skill}    onChange={(e)=>setSkill(e.target.value)} required  >
      <option value={skill} >{skill}</option>
  {
  skills.map((element)=>{
    return( <>
         <option value={element}>{element}</option> </> )
  })
  }
    </Form.Select>
    <Form.Control.Feedback type="invalid">
              {errors.skill}
            </Form.Control.Feedback>
</Col>
</Form.Group>
{/* ----------------------SELECT START DATE OF COURSE -------------------- */}
<Form.Group as={Row} className="mb-3" controlId="dob">
          <Form.Label column sm="5">
            <b className="text-white">ENTER START DATE</b>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate( e.target.value)}
              isInvalid={!!errors.startDate}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.startDate}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
{/* -------------------------time -----------------------------------*/}
<Form.Group as={Row} className="mb-3" controlId="formUserType">
<Form.Label className="text-white" column sm="5"><b className="text-white">
    Timing</b>
</Form.Label>
<Col sm="7">
    <Form.Control type='time' onChange={(e)=>setTime(e.target.value)} isInvalid={!!errors.times}  />
    <Form.Control.Feedback type="invalid">
              {errors.times}
            </Form.Control.Feedback>
</Col>
</Form.Group>
{/* -----------------------VENUE---------------- */}
<Form.Group as={Row} className="mb-3" controlId="formUserType">

<Form.Label className="text-white" column sm="5"><b className="text-white">

    Venue</b>
</Form.Label>
<Col sm="7">
    <Form.Select onChange={(e)=>setVenue(e.target.value)}  required  >
        <option value="Online"  >Online</option>
        <option value="Hyderabad"  >Hyderabad</option>
        <option value="Chennai" >Chennai</option>
        <option value="Pune" >Pune</option>
    </Form.Select>
</Col>
</Form.Group>
 <Form.Group as={Row} className="mb-3" controlId="formSubmit">
 
<Button className="col-12 btn-warning" type="submit" value="submit"  onClick={handleSubmit}> Submit </Button>

</Form.Group >
</Form>
<ToastContainer />
</>)
}


