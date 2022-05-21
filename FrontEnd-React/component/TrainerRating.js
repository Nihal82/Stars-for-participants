import React, { Component } from 'react'
import {Button,Form,Table} from 'react-bootstrap'
import TraineeHome from './TraineeHome';

export default class TrainerRating extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      classroomData :[],
      showHelpResolveModel:false,
      singledata : {}
    }
  }
  refreshData(){
    fetch("http://localhost:5177/api/ClassroomTrainings").then(response => response.json()).then(data=>this.setState({classroomData:data}));
}
componentDidMount(){
  this.refreshData();
}
componentDidUpdate(){
  this.refreshData();
} 
  logoutClick = (e) => {
    window.location = "./"
  }
  
  
  checkClick = async (e,id) =>{
    e.preventDefault();
    this.setState({showHelpResolveModel:true})
    await this.state.classroomData.forEach(r=>{
      if(r.id===id){
          console.log(r)
          this.setState({singledata:r})
      }
  })
    
}
  render() {
    
      let closeHelpResolveModel =() => {this.setState({showHelpResolveModel:false})} 
      const data = this.state.classroomData;  
      
      return (
        <>
        <Button className='float-end btn-danger mx-3' onClick={e=>this.logoutClick()} > Logout </Button>

        
        

        <Form className="m-auto bg-dark mt-2" style={{ width: "100%" }}>
          <h2 className="float-center text-success mb-4" style={{ width: "100%" }}>
            {sessionStorage.getItem("userType")} Trainer Rating
          </h2>

        </Form>
        <Table className='mt-4 text-white' variant="dark" bordered size='sm'>
           
           <thead>
           <tr><th colSpan={5} className="text-white text-center">Trainer Details</th></tr>
               <tr>
                   <th>Id</th>
                   <th>Subject</th>
                   <th>Timing</th>
                   <th>Venue</th>
                   
                   <th>Details</th>
               </tr>
           </thead>
           <tbody>
               
           </tbody>
     </Table>
      
        </>
      )
    
  }
}

