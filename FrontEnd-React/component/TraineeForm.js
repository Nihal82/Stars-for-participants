import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function TraineeForm(props) {
    const notifysucess = () => { toast.success("User Sucessfully added")};
    const notifyformerrors = ()=>{toast.error("PLease check the form and fill all the details")}
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [post, setPost] = useState(false);
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


const checktoday = (data)=>{
  const today = new Date();
  const entered= new Date(data);
  let difference=entered-today;
  if(today.toDateString() == 
                        entered.toDateString()) 
            {
return true;

}
else {
  return false
}

}


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
    } = form;

    // ------------Fetching emails for validation --------------------

    const newErrors = {};
    var name_expression = RegExp(/^[A-Za-z]*$/);
    console.log(name_expression.test(fname));

    if (!date || date === "") {
      newErrors.date = "Enter date of birth";
    } else if (calcAge(date) < 18) {
      newErrors.date = "You Shall be Minumum 18 YEARS OLD";
    }

    if (!gender || !gender === "") {
      newErrors.gender = "This field is mandatory";
    }

    if (!fname || fname === "" || fname === undefined || fname[0] === "") {
      newErrors.fname = "This is a mandatory field";
    } else if (!name_expression.test(fname)) {
      newErrors.fname = "shall contain no numbers";
    }

    if (!sname || sname === "" || sname === undefined || sname[0] === "") {
      newErrors.sname = "This is a mandatory field";
    } else if (!name_expression.test(sname)) {
      newErrors.sname = "shall contain no numbers";
    }

    if (!date || date === "") {
      newErrors.date = "Enter date of birth";
    } else if (calcAge(date) < 18) {
      newErrors.date = "You Shall be Minumum 18 YEARS OLD";
    }
    else if (calcAge(date)>50){
      newErrors.date="Enter valid date"
    }


    var pattern1 = RegExp(/^[0-9]+$/);
    var pattern2 = RegExp(/^[0-9]{10}$/);

    if (!pattern1.test(contact)) {
      newErrors.contact = "Must Contain Only Numbers";
    } else if (!pattern2.test(contact)) {
      newErrors.contact = "Must Contain 10 Digits Only";
    }

    if (!email || email === "" || email[0] === "") {
      newErrors.email = "Email is mandatory cannot be empty";
    }

    if (!gender || gender === "") {
      newErrors.gender = "Enter Gender";
    } else if (!(gender === "Male" || gender === "Female")) {
      newErrors.gender = "Gender Shall be Only Male Or Female";
    }
    console.log("approachogn emial fetch ");
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

    var passowrdPattern = RegExp(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    );
    console.log("Loggin password pattern " + passowrdPattern.test(password));
    if (!password || !confirmpassword) {
      newErrors.password = "Password Cannot Be Empty";
      newErrors.confirmpassword = "Password Cannot Be Empty";
    } else if (!passowrdPattern.test(password)) {
      newErrors.password =
        "Password Shall Contain Min 6 Characters and Must include Special Character And a Number ";
      if (!passowrdPattern.test(confirmpassword))
        newErrors.confirmpassword =
          "Password Shall Contain Min 6 Characters and Must include Special Character And a Number";
    } else if (password !== confirmpassword) {
      newErrors.password = "Passwords Donot Match";
      newErrors.confirmpassword = "Passwords Donot Match";
      console.log(newErrors.password);
    }
    return newErrors;
  };
  // -------------handle submit ----------------

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    console.log(form.fname);
    const formErrors = await validateForm();
    // --------------------FORM VALIDATION------------------------
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      {notifyformerrors()}
    } 
    else {

      console.log("lOGGING FINAL JSON OBJECT");
      let obj = {
        id: 0,
        firstName: form.fname,
        lastName: form.sname,
        gender: form.gender,
        dob: form.date,
        contact: form.contact,
        usertype: "Trainee",
        email: form.email,
        pass: form.password,
      };
      console.log(obj);
      fetch(
        "https://localhost:7134/api/Users",

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
        window.location='/UserLogIn'
    }
    console.log(form);
  };
  return (
    <>
      <Form className="m-auto mt-5" style={{ width: "40%" }}>
        <h1 className="text-center mb-4 text-dark" style={{ width: "100%" }}>
          TRAINEE REGISTRATION
        </h1>
        {/* this is for first name  */}
        <Form.Group as={Row} className="mb-3" controlId="formfirstName">
          <Form.Label column sm="5">
          <h5>   <b className="text-white">First Name</b> </h5>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              value={form.fname}
              onChange={(e) => {
                setField("fname", e.target.value);
              }}
              isInvalid={!!errors.fname}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.fname}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        {/* -------------------------Second name ----------------------- */}
        <Form.Group as={Row} className="mb-3" controlId="formsecondName">
          <Form.Label column sm="5">
          <h5>   <b className="text-white">Second Name</b> </h5>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="text"
              placeholder="Enter your second name"
              value={form.sname}
              onChange={(e) => {
                setField("sname", e.target.value);
              }}
              isInvalid={!!errors.sname}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.sname}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        {/* ---------------GENDER------------------------ */}
        <Form.Group as={Row} required className="mb-3" controlId="formGender">
          <Form.Label column className="text-white" sm="5">
          <h5>   <b> Gender</b> </h5>
          </Form.Label>
          <Col sm="3" className="mt-2">
            <Form.Check
              type="radio"
              id={`male`}
              className="text-white"
              label={`Male`}
              name="gender"
              isInvalid={!!errors.gender}
              onClick={(e) => setField("gender", "Male")}
              value={form.gender}
            />
          </Col>
          <Col sm="2" className="mt-2">
            <Form.Check
              type="radio"
              id={`female`}
              className="text-white"
              label={`Female`}
              name="gender"
              onClick={(e) => setField("gender", "Female")}
              value={form.gender}
              isInvalid={!!errors.gender}
            />
          </Col>
          <Form.Control.Feedback type="invalid">
            {errors.gender}
          </Form.Control.Feedback>
        </Form.Group>

        {/* ------------------DOB------- */}
        <Form.Group as={Row} className="mb-3" controlId="dob">
          <Form.Label column sm="5">
          <h5>  <b className="text-white">Date Of Birth</b> </h5>
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
          <h5>   <b className="text-white">Contact Info</b> </h5>
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
          <h5>   <b class="text-white">User Category</b> </h5>
          </Form.Label>

          <Col sm="7">
            <Form.Control
              type="text"
              value="Trainee"
              isInvalid={!!errors.user}
              disabled
            ></Form.Control>
          </Col>
        </Form.Group>

        {/* -------------------------email Type ----------------------- */}

        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm="5">
          <h5>   <b className="text-white">Email</b> </h5>
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
          <h5>    <b className="text-white">Password</b> </h5>
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
          <h5>  <b className="text-white">Confirm Password</b> </h5>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={form.confirmpassword}
              onChange={(e) => setField("confirmpassword", e.target.value)}
              isInvalid={!!errors.confirmpassword}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.confirmpassword}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-12 " controlId="formSubmit">
          <div class="col-md-12 text-center">
            <Button
              className="col-6 btn-warning "
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
            <Link type="signin" value="Sign in" to="/UserLogin">
              {" "}
              Log in{" "}
            </Link>
          </Form.Label>
        </Form.Group>


      </Form>
      <ToastContainer />
    </>
  );
}
