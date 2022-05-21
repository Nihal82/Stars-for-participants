import React ,{useState,useEffect}from 'react';
import { Form,Button,Table,Modal } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';

const handleTrainerAssign= async (trainer)=>{
    const notifysucess = () => { toast.success("Added Trainer")};
    //place at last


console.log("Loggin trainer object in handletrainerassign")

    console.log("Assigning trainer button clicked")
let obj = {
    id:0,
    TrainerName:trainer,
    temail:sessionStorage.getItem(trainer),
    semail:sessionStorage.getItem("semail"),
    message:"",
    status:"assigned",
    trainerRating:0,
    traineeRating:0,
    startDate:sessionStorage.getItem("startDate"),
    time:sessionStorage.getItem("time"),
    venue:sessionStorage.getItem("venue"),
    traineeName:sessionStorage.getItem("sname"),
    skill : sessionStorage.getItem("skill")

}

console.log("loggin final json object  before sending req to assigned table")
console.log(obj)

console.log(sessionStorage.getItem(obj.temail))
console.log()
const result = await fetch("https://localhost:7134/api/AssignedTables",
{
    method:"POST",
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body:JSON.stringify(obj)
    })
    .then(res=>res.json())
    .then(result=>console.log(result));
//assigning request ID values
const trainerDeleteId = sessionStorage.getItem(obj.temail);
const traineeDeleteId= sessionStorage.getItem(obj.semail);

//deleteing req in trainerreq and trainerraisesrequest table

//result data after delete action in trainer raise request table 
const res= fetch("https://localhost:7134/api/TrainerRaiseRequests/"+trainerDeleteId, { method: 'DELETE' })
                .then(res=>console.log(res));
//result data after deleting table values in trainee trquest table 
const res1 = fetch("https://localhost:7134/api/TrainingRequests/"+traineeDeleteId, { method: 'DELETE' })
                .then(res=>console.log(res));

// var trainerReqDeletionId = sessionStorage.getItem()






window.location='/ViewAllStudentRequest'



 


//end fetch



}
function ViewAllStudentRequest() {
    const [validTemail,setValidTemail]=useState({})
    const [semail,setSemail]=useState("")
    const [data,setData]=useState([]);
    const [trainers,setTrainers]=useState([]);
    const [modalShow, setModalShow] = React.useState(false);
  const [validTrainer,setValidTrainer]= useState([])

    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
           {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Assign Trainer
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
         <Table striped bordered hover>
             <thead >
                <tr>
                    <th>Available-Trainer</th>
                    <th>Assign</th>
                </tr>
             </thead>
             <tbody>
                 {
                     props.trainerlist.map((trainer)=>{
                         return (<>
                         <tr>              
                            <td span="col"> {trainer}</td>
                         <td span="col"><Button onClick={()=>handleTrainerAssign(trainer)}>Assign</Button></td>
                         </tr>

                         </>)
                     })
                 }

             </tbody>
         </Table> 
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
  const [trainerrequestId,setTrainerRequestId] = useState([]);

    useEffect(  () => {
        
        var result =   fetch("https://localhost:7134/api/TrainingRequests/")
        .then((response) => response.json())
        .then((fetcheddata) => {
          setData(fetcheddata)
          console.log(data);


          var res = fetch("https://localhost:7134/api/TrainerRaiseRequests")
          .then((response)=>response.json())
          .then((fetcheddata)=>{
            setTrainerRequestId(fetcheddata)
            console.log(fetcheddata)
            console.log("logging data fetched from trainesr request table")
            console.log(trainerrequestId)
          })
        });
        
      },[]);
const assignTrainer = async  (element)=>{
    console.log("loggin elemnt on button click")
    console.log(element)
    sessionStorage.setItem(element.semail,element.id)
    var temp =element.skill
    //fetched trainers requests with matching skills
   var result =  await fetch("https://localhost:7134/api/TrainerRaiseRequests/api/"+temp+"?skill="+temp)
   .then((response)=>response.json())
   .then((data)=>{
       console.log("Logging trainer will required skills")
       console.log(data)
       console.log("Logging Trainers")
       setTrainers(data)
       console.log(trainers)
//fetching all trainer with required skills from trainerraiserequest table
 data.map(async (trainer)=>{
   
    if(trainer.startdate===element.startdate && trainer.time===element.time){
        sessionStorage.setItem("temail",trainer.temail)
        console.log("Loggin related req id  in above line ")
       sessionStorage.setItem(trainer.temail,trainer.id)




        console.log("inside data.map querying matching start date and time")
        var name = '';
        var temp2=trainer.temail.split('@');
        var stemp=element.semail.split('@');
       
        //fetching trainer name 
        console.log('loggin username fetch api string')
        var sresult = fetch("https://localhost:7134/api/Users/api/"+stemp[0]+"%40"+stemp[1]+"?email="+stemp[0]+"%40"+temp2[1])
            .then((res)=>res.text())
            .then((fetcheddata)=>{
                sessionStorage.setItem("sname",fetcheddata)
            })



        var url="https://localhost:7134/api/Users/api/"+temp2[0]+"%40"+temp2[1]+"?email="+temp2[0]+"%40"+temp2[1];
        console.log(url)
        var result = await fetch("https://localhost:7134/api/Users/api/"+temp2[0]+"%40"+temp2[1]+"?email="+temp2[0]+"%40"+temp2[1])
        .then((res)=>res.text())
        .then((fetcheddata)=>{
            console.log("Fetching trainer Name")
            console.log(fetcheddata)
           setValidTrainer(prevstate=>
              [...prevstate,fetcheddata]
           )
           console.log("Logging trainer email")
           console.log(trainer.temail)
            sessionStorage.setItem(fetcheddata,trainer.temail)
           let tempobj = {
              
           }
           console.log("logging temp object ")
           console.log(tempobj)
            console.log("logging valid trainer ")
            console.log(validTrainer)
            console.log("Valid Trainer emails")
            console.log(validTemail)
        }
        )
    }
}
)
console.log("printing all eligible trainer list")
console.log(validTrainer)
}
   )



}//end assign function




  return (
    <div>
<Table  className='table-striped bg-light'  variant="light" bordered size='sm' >
           
                <thead className="thead-dark">
                <tr><th colSpan={12} className="text-black text-center">ALL STUDENT REQUEST</th></tr>
                    <tr >
                    <th scope="col">Id</th>
                        <th scope="col">Email</th>
                      <th scope="col">Skill</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Trainer</th>
                      <th scope="col">Venue</th>
                      <th scope='col'>Assign</th>
                    </tr>
                </thead>
                <tbody>
                
{
    data.map((element)=>{
     
        return (<>
        <tr key={element.id}>       
        </tr>
        <td >{element.id}</td>
        <td>{element.semail}</td>
        <td>{element.skill}</td>
        <td>{element.startdate}</td>
        <td>{element.time}</td>
        <td>{element.trainer}</td>
        <td>{element.venue}</td>
        
            {/* <Button onClick={()=>assignTrainer(element)} >Assign</Button> */}
            <Button onClick={async () =>{ await assignTrainer(element);sessionStorage.setItem("skill",element.skill);sessionStorage.setItem("time",element.time);sessionStorage.setItem("venue",element.venue); sessionStorage.setItem("startDate",element.startdate); sessionStorage.setItem("semail",element.semail); console.log("inside button method"); console.log(validTrainer);setModalShow(true) } } >Assign</Button>
        </>)
    })
}              
                </tbody>
          </Table>
          <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() =>{ setModalShow(false); window.location.reload(false)}}  
        trainerlist={validTrainer}
        
        />
        <div class="text-center">

<Button variant="danger" className='btn-lg' onClick={  ()=>window.location='./AdminHome'}>Back</Button>
</div>
</div>
  )
}

export default ViewAllStudentRequest