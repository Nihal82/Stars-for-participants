import React ,{useState,useEffect}from 'react';
import { Form,Button,Table } from "react-bootstrap";
import { Windows } from 'react-bootstrap-icons';


function ViewTrainerRequest() {
    const [data,setData]=useState([]);
    var requests = []
    var arr=[]
    var table=[]
    const fetchdetails = async ()=>{
        var temp = sessionStorage.getItem("email")
    const string=  temp.split('@')
    // https://localhost:7134/api/TrainingRequests/admin%40gmail.com?email=admin%40gmail.com
       var result = await   fetch("https://localhost:7134/api/TrainingRequests/"+string[0]+"%40"+string[1]+"?email="+string[0]+"%40"+string[1])
        .then((response) => response.json())
        .then((data) => {
          setData(data)
          console.log(data);
        });
        console.log("request array below")
        console.log(requests)
        console.log("result down ")
    console.log("Loggin speciic request array ")
    console.log(requests.map(element=>{console.log(element.id)}))
    }
    useEffect(  () => {
        var temp = sessionStorage.getItem("email")
        const string=  temp.split('@')
        var result =    fetch("https://localhost:7134/api/TrainerRaiseRequests/"+string[0]+"%40"+string[1]+"?email="+string[0]+"%40"+string[1])
        .then((response) => response.json())
        .then((data) => {
          setData(data)
          console.log(data);
        });
        
      }, []);
const deleteRequest = (id)=>{
console.log("Loggin uri for delete ")
console.log()
  const res= fetch("https://localhost:7134/api/TrainerRaiseRequests/"+id, { method: 'DELETE' })
        .then(() => this.setState({ status: 'Delete successful' }));
        window.location.reload(false)
}
  return (
    <div>
<Table  className=' bg-light'  variant="dark" bordered size='sm' >
           
                <thead className="thead-dark">
                <tr><th colSpan={12} className="text-black text-center">MY REQUESTS</th></tr>
                    <tr >
                        <th scope="col">Id</th>
                        <th scope="col">Email</th>
                      <th scope="col">Skill</th>
                      <th scope="col">Start Date</th>
                    
                      <th scope="col">Time</th>
                      <th scope="col">Student</th>
                      <th scope="col">Venue</th>
                      <th scope="col">Assigned</th>
                       <th scopr="col">Delete</th>
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
        <td><Button variant="primary"  onClick={()=>deleteRequest(element.id)}>Delete</Button></td>
        </tr>
       
        </>)
    })
}              
            
                </tbody>
          </Table>

          <div class="text-center">

<Button variant="danger" className='btn-lg' onClick={  ()=>window.location='./TrainerHome'}>Back</Button>
</div>
</div>
  )

}

export default ViewTrainerRequest