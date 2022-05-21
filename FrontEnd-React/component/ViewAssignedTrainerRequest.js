import React ,{useState,useEffect}from 'react';
import { Form,Button,Table,Modal } from "react-bootstrap";

function ViewAssignedTrainerRequest() {
    function MyVerticallyCenteredModal(props) {
        const [rating,setRating] = useState(0)
        const submitRating = ()=>{
            console.log("printing rating")
            console.log(rating)

            var obj = JSON.parse(sessionStorage.getItem('trainer'));
            console.log(obj)

            obj["traineeRating"]=rating;
            console.log("printing final value")
            console.log(obj)
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };
            const result = fetch('https://localhost:7134/api/AssignedTables/'+obj["id"], requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
        
console.log("Executed put method above value is the response ")

window.location='/ViewAssignedTrainerRequest'

        }
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Rate Trainee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e)=>{e.preventDefault(); submitRating()}}>
            <input class="form-control-sm" onChange={(e)=>{setRating(e.target.value)}} type="number" id="quantity" name="quantity" min="1" max="10"/>
            <input class="btn btn-primary" type="submit"/>
            </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
    const [modalShow, setModalShow] = React.useState(false);
const giveRating = ()=>{

}




const [data,setData] = useState([])
useEffect(  () => {
var temp = sessionStorage.getItem("email")
    const string=  temp.split('@')
    // https://localhost:7134/api/TrainingRequests/admin%40gmail.com?email=admin%40gmail.com
    const role = "Trainer"
    var temp1="https://localhost:7134/api/AssignedTables/api/"+string[0]+"%40"+string[1]+"?email="+string[0]+"%40"+string[1]+"&role="+role
    console.log(temp1)
   
       var result =    fetch("https://localhost:7134/api/AssignedTables/api/"+string[0]+"%40"+string[1]+"?email="+string[0]+"%40"+string[1]+"&role="+role)
        .then((response) => response.json())
        .then((data) => {
          setData(data)
          console.log(data);
        });
    }, []);
  return (
  <>
  <Table  className=' bg-light'  variant="dark" bordered size='sm' >
           <thead className="thead-dark">
           <tr><th colSpan={12} className="text-black text-center">MY REQUESTS</th></tr>
               <tr >
                   <th scope="col">Id</th>
                   <th scope="col">Trainer Name</th>
                 <th scope="col">Trainer-Email</th>
                 <th scope='col'>Skill Trained</th>
                 <th scope="col">Start Date</th>
                 <th scope="col">Time</th>
                 <th scope="col">Student</th>
                 <th scope="col">Student Email</th>
                 <th scope="col">Venue</th>
                 <th scope='col'>Rating</th>
                 <th scope="col">GiveRating</th>
                 
               </tr>
           </thead>
           <tbody>
{
data.map((element)=>{
   return (<>
   <tr key={element.id}>       
    <td >{element.id}</td>
   <td>{element.trainerName}</td>
   <td>{element.temail}</td>
   <td>{element.skill}</td>
   <td>{element.startDate}</td>
   <td>{element.time}</td>
   <td>{element.traineeName}</td>
   <td>{element.semail}</td>
   <td>{element.venue}</td>
   <td>{element.traineeRating}</td>
   <td><Button onClick={()=>{setModalShow(true); sessionStorage.setItem('trainer', JSON.stringify(element));
 }}>GiveRating</Button></td>
   </tr>
   </>)
})
}
           </tbody>
     </Table>

     <MyVerticallyCenteredModal
          
          show={modalShow}
          onHide={() => setModalShow(false)}  

          
          />


<div class="text-center">

<Button variant="danger" className='btn-lg' onClick={  ()=>window.location='./TrainerHome'}>Back</Button>
</div>
  </>
  )
}
export default ViewAssignedTrainerRequest