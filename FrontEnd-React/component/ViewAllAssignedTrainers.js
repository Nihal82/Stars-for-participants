import React from 'react'
import {useEffect,useState} from 'react';
import { Form, Button, Row, Col, Alert,Table } from "react-bootstrap";
function ViewAllAssignedTrainers() {
    const [data,setData]=useState([]);

    useEffect(  () => {
        var temp = sessionStorage.getItem("email")
        const string=  temp.split('@')
        var result =    fetch("https://localhost:7134/api/AssignedTables/")
        .then((response) => response.json())
        .then((fetcheddata) => {
          setData(fetcheddata)
          console.log(data);
        });
        
      },[]);

  return (
        
   <><Table  className='table-striped bg-light'  variant="light" bordered size='sm' >
           
   <thead className="thead-dark">
   <tr><th colSpan={12} className="text-black text-center">All MAPPED TRAINERS</th></tr>
       <tr >
       <th scope="col">Id</th>
       <th>Trainer Name</th>
           <th scope="col">Trainer-Email</th>
           <th>Start Date</th>
           <th>Trainee Name</th>
         <th scope="col">Trainee Email</th>
         <th>Trainer-Rating</th>
         <th>Trainee-Rating</th>
         <th scope="col">Time</th>
        
         <th scope="col">Venue</th>
       

       </tr>
   </thead>
   <tbody>
   
{
data.map((element)=>{

return (<>
<tr key={element.id}>       
</tr>
<td >{element.id}</td>
<td>{element.TrainerName}</td>
<td>{element.temail}</td>
<td>{element.startdate}</td>
<td>{element.traineeName}</td>
<td>{element.semail}</td>
<td>{element.trainerRating}</td>
<td>{element.traineeRating}</td>
<td>{element.time}</td>
<td>{element.venue}</td>


</>)
})
}              
   </tbody>
</Table></>
  )
}

export default ViewAllAssignedTrainers