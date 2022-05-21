import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

export default function TrainerForm(props) {
  const notifysucess = () => { toast.success("User Sucessfully added")};
  const notifyformerrors = ()=>{toast.error("PLease check the form and fill all the details")}
  const [selected, setSelected] = useState([]);
  const arr = [];
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [post, setPost] = useState(false);
  const [value, setValue] = React.useState([1, 3]);
  const handleChange = (val) => setValue(val);
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  const getEmail = async () => {
    let list = [];
    let emaillist = await fetch("https://localhost:7134/api/Users/api/emailId")
      .then((response) => response.json())
      .then((data) => {
        list = data;
        console.log(data);
      });
    
    console.log("after get ");
    
    const arrstring = list.toString();
    console.log(arrstring);
    list = arrstring.split(",");
    console.log("before returning list ");
    console.log(typeof list);
    console.log(list);
    return await list;
  };
  const calcAge = (date) => {
    const today = new Date();
    const birthdate = new Date(date);
    let age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  };
  const validateForm = async () => {
    const {
      fname,
      sname,
      gender,
      date,
      contact,
      userType,
      email,
      password,
      confirmpassword,
      skills,
    } = form;

    const newErrors = {};
    var name_expression = RegExp(/^[A-Za-z]*$/);
    console.log(name_expression.test(fname));

    if (!date || date === "") {
      newErrors.date = "Enter date of birth";
    } else if (calcAge(date) < 18) {
      newErrors.date = "You Shall be Minumum 18 YEARS OLD";
    }

    if (!gender || gender === "") {
      newErrors.gender = "Enter Gender";
    } else if (!(gender === "Male" || gender === "Female")) {
      newErrors.gender = "Gender Shall be Only Male Or Female";
    }

    if (!fname || fname === "" || fname === undefined || fname[0] === "") {
      newErrors.fname = "This is a mandatory field";
    } else if (!name_expression.test(fname)) {
      newErrors.fname = "shall contain no numbers";
    }

    if (!sname || sname === "" || sname[0] === "") {
      newErrors.sname = "This is a mandatory field";
    } else if (!name_expression.test(sname)) {
      newErrors.sname = "shall contain no numbers";
    }

    if (!email || email === "" || email[0] === "") {
      newErrors.email = "Email is mandatory cannot be empty";
    }

    var EmailRegEx = RegExp(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    let fetchedemaillist = await getEmail();
    console.log("tring to fetch email : ");
    console.log(fetchedemaillist);
    console.log("fetching completed ");
    if (!EmailRegEx.test(email)) {
      newErrors.email = "Please Enter Valid Email";
    } else if (fetchedemaillist.includes(email)) {
      console.log("inside fetched email list checking ");
      console.log(fetchedemaillist.includes(email));
      newErrors.email = "mail already exists";
    }
    var pattern1 = RegExp(/^[0-9]+$/);
    var pattern2 = RegExp(/^[0-9]{10}$/);

    if (!pattern1.test(contact)) {
      newErrors.contact = "Must Contain Only Numbers";
    } else if (!pattern2.test(contact)) {
      newErrors.contact = "Must Contain 10 Digits Only";
    }

    var passowrdPattern = RegExp(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    );
    console.log("Loggin password pattern " + passowrdPattern.test(password));
    if (!password || !confirmpassword) {
      newErrors.password = "Password Cannot Be Empty";
      newErrors.confirmpassword = "Password Cannot Be Empty";
    } else if (password !== confirmpassword) {
      newErrors.password = "Passwords Donot Match";
      newErrors.confirmpassword = "Passwords Donot Match";

      console.log(newErrors.password);
    } else if (!passowrdPattern.test(password)) {
      newErrors.password =
        "Password Shall Contain Min 6 Characters and Must include Special Character";
      if (!passowrdPattern.test(confirmpassword))
        newErrors.confirmpassword =
          "Password Shall Contain Min 6 Characters and Must include Special Character";
    }

    return newErrors;
  };
  //   -------------------------------Handle Submit-------------------------------------------
  const handleSubmit = async (e) => {

    e.preventDefault();

    // getting check box group and getting check values
    var markedCheckbox = document.querySelectorAll(
      'input[name="group"]:checked'
    );
    var finalCheckList = [];
    markedCheckbox.forEach((element) => {
      finalCheckList.push(element.id);
    });

    var finalstring = finalCheckList.join(",");
    console.log("Final string " + finalstring);
    console.log("printing final checked array ");
    console.log(finalCheckList);

    setField("user", props.user);

    setField("skills", finalstring);

    const formErrors = await validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      {notifyformerrors()}
    }
     else {
       {notifysucess()}
      console.log("entered post and removing confiirm password");
      let obj ={
        id: 0,
         firstName: form.fname,
         lastName: form.sname,
         gender: form.gender,
         dob: form.date,
         contact:form.contact,
         usertype:"Trainer",
         email: form.email,
         pass: form.password,
         skills: finalstring
     
       } 
      console.log("Final log object : ")
      console.log(obj)



// -------------------Maik Api Call to post Data ---------------
fetch("https://localhost:7134/api/Users",

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

window.location='/UserLogIn'

    }
  
  };

  return (
    <>
      <Form className="m-auto mt-5" style={{ width: "40%" }}>
        <h1 className="text-right mb-4 text-dark" style={{ width: "100%" }}>
          TRAINER REGISTRATION
        </h1>

        {/* this is for first name  */}

        <Form.Group as={Row} className="mb-3" controlId="formfirstName">
          <Form.Label column sm="5">
          <h5>  <b class="text-white">First Name</b> </h5>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="text"
              placeholder="Enter your First name"
              value={form.fname}
              onChange={(e) => setField("fname", e.target.value)}
              isInvalid={!!errors.fname}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.fname}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        {/* -------------------------Last name ----------------------- */}

        <Form.Group as={Row} className="mb-3" controlId="formLastName">
          <Form.Label column sm="5">
         <h5>  <b className="text-white">Last Name</b></h5>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="text"
              placeholder="Enter your Last name"
              value={form.sname}
              onChange={(e) => setField("sname", e.target.value)}
              isInvalid={!!errors.sname}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.sname}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* ---------------------------Gender ------------------------ */}

        <Form.Group as={Row} required className="mb-3" controlId="formGender">
            <Form.Label column  className="text-white" sm="5">
            <h5>   <b> Gender</b> </h5>
            </Form.Label>
            <Col sm="3" className='mt-2'>
            <Form.Check type='radio' id={`male`} className="text-white" label={`Male`} name="gender"
             isInvalid={!!errors.gender}
            onClick={(e) => setField("gender", "Male")} value={form.gender} />
            </Col>
            <Col sm="2" className='mt-2'>
            <Form.Check type='radio' id={`female`} className="text-white" label={`Female`} name="gender"
             
            onClick={(e) => setField("gender", "Female")} value={form.gender} isInvalid = {!!errors.gender}/>
            </Col>
            <Form.Control.Feedback type="invalid"> 
  {errors.gender}

</Form.Control.Feedback>
            </Form.Group>
        {/* ------------------DOB------- */}
        <Form.Group as={Row} className="mb-3" controlId="dob">
          <Form.Label column sm="5" className="text-white">
          <h5>  <b>Date Of Birth</b> </h5>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="date"
              value={form.date}
              onChange={(e) => setField("date", e.target.value)}
              isInvalid={!!errors.sname}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        {/* -------------------------contact Info ----------------------- */}

        <Form.Group as={Row} className="mb-3" controlId="contach">
          <Form.Label column sm="5">
           <h5> <b className="text-white">Contact Info</b> </h5>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="text"
              placeholder="Enter your Phone Number"
              value={form.contact}
              onChange={(e) => setField("contact", e.target.value)}
              isInvalid={!!errors.contact}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.contact}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/*-------------------------Userype---------------*/}
        <Form.Group as={Row} className="mb-3" controlId="formUserType">
          <Form.Label className="text-white" column sm="5">
           <h5> <b class="text-white">User Category</b> </h5>
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              value="Trainer"
              isInvalid={!!errors.user}
              disabled
            ></Form.Control>
          </Col>
        </Form.Group>

        {/* -------------------------Email ----------------------- */}

        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm="5">
          <h5> <b className="text-white">Email</b> </h5>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              isInvalid={!!errors.email}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* -------------------------PASSWORD Field 1  ----------------------- */}
        <Form.Group as={Row} className="mb-3" controlId="pass">
          <Form.Label column sm="5">
          <h5>  <b class="text-white">Password</b> </h5>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              isInvalid={!!errors.password}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        {/* ------------------------ Confirm password  ----------------------- */}

        <Form.Group as={Row} className="mb-3" controlId="confirmpass">
          <Form.Label column sm="5">
            <h5><b class="text-white">Confirm Password</b></h5>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="password"
              placeholder="Enter confim Password"
              value={form.confirmpassword}
              onChange={(e) => setField("confirmpassword", e.target.value)}
              isInvalid={!!errors.confirmpassword}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.confirmpassword}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group>
          <Form.Label column sm="5">
            <b class="text-white">Select Skill Set</b>
          </Form.Label>

          {["Html", "Css", "JavaScript", "React", "Angular"].map((type) => (
            <div key={`inline-${type}`} className="mb-3 text-white">
              <Col sm="7">
                <Form.Check
                  inline
                  className="text-white mx-2"
                  label={type}
                  name="group"
                  type="checkbox"
                  id={type}
                  onClick={(e) => {
                    if (e.target.checked) {
                      arr.push({ type });
                      console.log(
                        "Checking value of e.target.vale, e.target.checked , e.currenttarget.checked"
                      );
                      console.log(e.target.value);
                      console.log(e.target.checked);
                      console.log(e.currentTarget.checked);
                      console.log(e.currentTarget.value);
                      console.log("Checking checked value ");

                      var finarray = Array.from(new Set(arr));
                      console.log(finarray);

                      console.log("Array tracking in checkbox");
                      console.log(arr);
                    } else if (e.target.unchecked) {
                      arr.pop({ type });
                      console.log("Printting unchecked array");
                      console.log(arr);
                    }
                  }}
                />
              </Col>
            </div>
          ))}

          <Form.Group as={Row} className="mb-3" controlId="formSubmit">
            <div class="col-md-12 text-center">
              <Button
                className="col-12 btn-warning"
                type="submit"
                value="submit"
                onClick={handleSubmit}
              >
                {" "}
                Register{" "}
              </Button>
            </div>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formSignin">
            <Form.Label column sm="5">
              {" "}
              <b class="text-white">Already have an account?</b>
              <Link type="signin" value="Sign in" to="/UserLogIn">
                {" "}
                Log in{" "}
              </Link>
            </Form.Label>
          </Form.Group>




          
        </Form.Group>
      </Form>
      <ToastContainer />
     
    </>
  );
                }
