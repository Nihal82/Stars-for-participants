import React ,{useState,useEffect}from 'react';
import {Form,Button,Row,Col,Alert} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TraineeHome from './TraineeHome';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function RaiseRequest(props){ 
   
  const notifysucess = () => { toast.success("Sucessfully Raised req")};
  

    const [startDate,setStartDate]=useState("")
    const [endDate,setEndDate]=useState("")
    const [venues,setVenue]=useState("online");
    const [times,setTime]=useState("");
    const [skills,setSkill]=useState("React");
    const arr= []
    const [errors , setErrors] = useState({}); 
    const checktoday = (data)=>{
      const today = new Date();
      const entered= new Date(data);
      let diff = today.getFullYear() - entered.getFullYear();
      const m = today.getMonth() - entered.getMonth();
      const d = today.getDate()- entered.getDate()
      if (m < 0 || (m === 0 && today.getDate() < entered.getDate())   ){
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
}
else {
    setErrors({})
    let obj = {
        id: 0,
        semail: sessionStorage.getItem("email"),
        venue : venues,
        startdate:startDate,
        enddate:startDate,
        time:times,
        trainer:"notassigned",
        skill:skills,
        assigned:"no",
        rating:0,
        temail:"notassigned"
      };

// ------------POSTING DATA ----------------

fetch(
  "https://localhost:7134/api/TrainingRequests",

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


window.location='/TraineeHome'
console.log("Loggin json object ")
console.log(obj)
console.log("inside else block after form validation in raise request loggin form below")
}
}
return (<>
<TraineeHome/>
<Form className='m-auto mt-5' style={{width:"40%"}}> 
<Form.Group as={Row} className="mb-3" controlId="formUserType">
<Form.Label className="text-white" column sm="5"><b className="text-white">
    Subject</b>
</Form.Label>
<Col sm="7">
    <Form.Select     onChange={(e)=>setSkill(e.target.value)} required  >
        <option value="React"  >React</option>
        <option value='JavaScript'  >Java Script</option>
        <option  value='Html'  >Html</option>
        <option value='Css' >Css</option>
        <option  value="Angular" >Angular</option>
    </Form.Select>
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
        {/* ---------------------------END DATE --------------------- */}
       
{/* <Form.Group as={Row} className="mb-3" controlId="dob">
          <Form.Label column sm="5">
            <b className="text-white">Enter End Date </b>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate( e.target.value)}
              isInvalid={!!errors.endDate}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.endDate}
            </Form.Control.Feedback>
          </Col>
        </Form.Group> */}
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


