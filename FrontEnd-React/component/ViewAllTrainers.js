import React ,{useState,useEffect}from 'react';
import { Form,Button,Table } from "react-bootstrap";
function ViewAllTrainers() {
    const [data,setData]=useState([]);
    var requests = []
    var arr=[]
    var table=[]
   
    
    

    

    useEffect(  () => {
        
        var result =    fetch("https://localhost:7134/api/Users")
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
                <tr><th colSpan={12} className="text-black text-center">ALL TRAINERS </th></tr>
                    <tr >
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        
                        <th scope="col">Email</th>
                      <th scope="col">Skill-Set</th>
                      
                    </tr>
                </thead>
                <tbody>
{
    data.map((element)=>{
        if(element.usertype==="Trainer")
        return (<>
        <tr key={element.id}>    
        <td>{element.id}</td>   
         
        <td>{element.firstName}</td>
        <td>{element.email}</td>
        <td>{element.skills}</td>
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

export default ViewAllTrainers