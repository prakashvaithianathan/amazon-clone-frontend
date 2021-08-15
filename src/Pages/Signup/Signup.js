import React, { useState } from "react";

import { Link } from "react-router-dom";
import axios from '../../axios'
import validator from 'validator'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import style from "./Signup.module.css";

const Signup = () => {


  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
 
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("")
  const [emailError, setEmailError] = useState('')
  
  const [emptyEmail, setEmptyEmail] = useState("")
  const [emptyFirstName,setEmptyFirstName] = useState("")
  const [emptyLastName,setEmptyLastName] = useState("")
  const [emptyPassword,setEmptyPassword] = useState("")


  const handleChange = (event) => {

    setEmptyLastName('')
    setEmptyFirstName('')
    setEmptyEmail('')
    setEmptyPassword('')
    setEmailError('')
    
    const { name, value } = event.target;
    setValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  

  const handleClick = async(event) => {
   
     event.preventDefault();

   if(value.firstName.trim()===""){
     return setEmptyFirstName('! Please fill out this field')
   }
   if(value.lastName.trim()===""){
     return setEmptyLastName('! Please fill out this field')
   }
   if(value.email.trim()===""){
     return setEmptyEmail('! Please fill out this field')
   }
   if(value.password.trim()===""){
     return setEmptyPassword('! Please fill out this field')
   }

   if(validator.isEmail(value.email)){
            
  
    
    setValue({
      firstName:'',
      lastName:'',
      email:'',
      password:''
    })
  
   
     const config ={
         headers:{
             'Content-Type':'application/json'
         }
     }

   onOpenModal()
     try {
      
         const res = await axios.post('/api/user/signup',value,config);
         setMessage(res.data.message)
     } catch (error) {
         setMessage(error.response.data.message)
     }

    }else{
      setEmailError('! Enter the valid Email Address')
    }
     
  
  };
  

  

  return (
    <div className={style.container}>
      <div className={style.logo}>
       <Link to='/'><img
          src="http://pngimg.com/uploads/amazon/small/amazon_PNG8.png"
          alt="logo"
        /></Link> 
      </div>
      <div className={style.mainBox}>
        <div className={style.box}>
          <h2>Create Account</h2>
          <form className={style.form}>
            <h6 className={style.field}>Enter your Firstname</h6>

            <input
              className={style.input}
              type="text"
              name="firstName"
              required={true}
              onChange={handleChange}
              value={value.firstName}
            />
           
            <p className={style.warning}>
              {emptyFirstName? emptyFirstName :null}
            </p>
            <br />
            <h6 className={style.field}>Enter your Lastname</h6>
            <input
              className={style.input}
              type="text"
              name="lastName"
              required={true}
              onChange={handleChange}
              value={value.lastName}
            />
            <p className={style.warning}>
             {emptyLastName? emptyLastName :null}
            </p>
            <br />

            <h6 className={style.field}>Enter your Email</h6>
            <input
              className={style.input}
              type="email"
              name="email"
              required={true}
              onChange={handleChange}
              value={value.email}
            />
            <p className={style.warning}>
             {emptyEmail? emptyEmail :null}
             {emailError?emailError:null}
            </p>
            <br />
            <h6 className={style.field}>Enter your Password</h6>
            <input
              className={style.input}
              type="password"
              name="password"
              autoComplete="cc-number"
              required={true}
              onChange={handleChange}
              value={value.password}
            />
            <p className={style.warning}>
            {emptyPassword? emptyPassword :null}
            </p>

            <br />
            <p>We will send you a text to verify your phone.</p>
            <p>Message and Data rates may apply</p>
            {/* <br /> */}
            <div className={style.buttonBox}>
              <button
                type="button"
                onClick={handleClick}
                className={style.button}
              >
                Sign-Up
              </button>
            </div>
          </form>
          <p>
            Already have an account ?{" "}
            <Link to="/login" className={style.link}>
              Sign in{" "}
            </Link>{" "}
          </p>
        </div>

        <p className={style.privacy}>
          Conditons of Use&nbsp;&nbsp;&nbsp; Privacy Notice
          &nbsp;&nbsp;&nbsp;Help
        </p>
        <p className={style.legal}>
          © 1996-2021, Amazon.com, Inc. or its affliates
        </p>
      </div>
      <div>
      {message ? 
         
         <Modal  open={open} onClose={onCloseModal} center>
           
           <h2 className={style.modal}>{message}</h2>
         </Modal> :null}
      </div>
    </div>
  );
};

export default Signup;
