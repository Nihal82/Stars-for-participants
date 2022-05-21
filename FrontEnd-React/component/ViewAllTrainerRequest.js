import React ,{useState,useEffect}from 'react';
import { Form,Button,Table } from "react-bootstrap";
function ViewTrainerRequest() {
    const [data,setData]=useState([]);
    var requests = []
    var arr=[]
    var table=[]
   
    
    

    

    useEffect(  () => {
        
        var result =    fetch("https://localhost:7134/api/TrainerRaiseRequests/")
        .then((response) => response.json())
        .then((data) => {
          setData(data)
          console.log(data);
        });
        
      }, []);




      
  return (
    <div>
<Table  className='table table-striped '  variant="light" bordered size='sm' >
           
                <thead className="thead-dark">
                <tr><th colSpan={12} className="text-black text-center">ALL TRAINER REQUESTS</th></tr>
                    <tr >
                        <th scope="col">Id</th>
                        <th scope="col">Email</th>
                      <th scope="col">Skill</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Student</th>
                      <th scope="col">Venue</th>
                      <th scope="col">Assigned</th>
                    </tr>
                </thead>
                <tbody>
                
{
    data.map((element)=>{
        return (<>
        <tr key={element.id}>       
         <td >{element.id}</td>
        <td>{element.temail}</td>
        <td>{element.skill}</td>
        <td>{element.startdate}</td>
      
        <td>{element.time}</td>
        <td>{element.student}</td>
        <td>{element.venue}</td>
        <td>{element.stuassigned}</td>
        </tr>

        </>)
    })
}              
            
                </tbody>
          </Table>

          <div class="text-center">

<Button variant="danger" className='btn-lg' onClick={  ()=>window.location='./AdminHome'}>Back</Button>
</div>
</div>
  )
}

export default ViewTrainerRequest