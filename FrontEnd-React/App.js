import React  from "react";
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import "./App.css";
import Homepage from "./component/Homepage";
import Test from "./component/Test"
import UserLogIn from "./component/UserLogIn";
import TrainerForm from "./component/TrainerForm";
import TraineeForm from "./component/TraineeForm";
import TraineeHome from "./component/TraineeHome";
import RaiseRequest from "./component/RaiseRequest";
import TrainerRating from "./component/TrainerRating"
import ViewRequestDetails from './component/ViewRequestDetails'
import TrainerHome from './component/TrainerHome'
import TrainerRaiserequest from './component/TrainerRaiserequest'
import ViewTrainerRequest from './component/ViewTrainerRequest'
import AdminHome from './component/AdminHome'
import ViewAllTrainerRequest from "./component/ViewAllTrainerRequest";
import ViewAllStudentRequest from "./component/ViewAllStudentRequest";
import ViewAllAssignedTrainers from "./component/ViewAllAssignedTrainers";
import ViewAssignedTrainerRequest from "./component/ViewAssignedTrainerRequest";
import ViewAssignedTraineeRequest from "./component/ViewAssignedTraineeRequest"
import ViewAllTrainers from "./component/ViewAllTrainers";

const App = () => {
  return(
    <>  
    <BrowserRouter>
    <div>
    <Routes>    
    <Route exact path="/" element={<Homepage/>}/>
    <Route exact path="/TrainerForm" element={<TrainerForm/>}/>
     {/* <Route exact path="/TraineeRegister" element={<TraineeRegister/>}/>
     */}
     <Route exact path="/TraineeForm" element={<TraineeForm/>}/>
     <Route exact path="/UserLogIn" element={<UserLogIn/>}/>
  <Route exact path="/TraineeHome" element={<TraineeHome />} />
    <Route exact path="/Test" element={<Test/>}/>
    <Route exact path="/Raiserequest" element={<RaiseRequest />} />
    <Route exact path ='/TrainerRating' element={<TrainerRating />} />
    <Route exact path ='/ViewRequestDetails' element={<ViewRequestDetails />} />
    <Route exact path ='/TrainerHome' element={ <TrainerHome /> } />
    <Route exact path ='/TrainerRaiserequest' element={ <TrainerRaiserequest /> } />
    <Route exact path ='/ViewTrainerRequest' element={ <ViewTrainerRequest /> } />
<Route exact path ='/ViewAllStudentRequest' element={<ViewAllStudentRequest />} />
    <Route exact path ='/AdminHome' element = {<AdminHome />} />
<Route exact path='/ViewAllTrainerRequest' element= {<ViewAllTrainerRequest />} />
   
   <Route exact path ='/ViewAllAssignedTrainers' element={<ViewAllAssignedTrainers/>} />
   <Route exact path ='/ViewAssignedTrainerRequest' element={<ViewAssignedTrainerRequest/>} />
   <Route exact path ='/ViewAssignedTraineeRequest' element={<ViewAssignedTraineeRequest/>} />
   <Route exact path ='/ViewAllTrainers' element={<ViewAllTrainers />} />
    </Routes>
    </div>
    </BrowserRouter>
    <div className="one"> 
      {/* <TraineeHome/> */}
       {/* <TrainerHome/>  */}
    </div>
    
    </>
  );
};
export default App;