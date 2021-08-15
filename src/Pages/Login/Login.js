import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";
import axios from "../../axios";
// import * as authActions from "../../store/actions/user";
import { useDispatch } from "react-redux";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import style from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [emptyEmail, setEmptyEmail] = useState("")
  const [emptyPassword,setEmptyPassword] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmptyPassword('')
    setEmptyEmail('')
    setValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [message, setMessage] = useState("");
  const [nextPage, setNextPage] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();

    if(value.email.trim()===""){
      return setEmptyEmail('! Please fill out this field')
    }
    if(value.password.trim()===""){
      return setEmptyPassword('! Please fill out this field')
    }

    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    onOpenModal();
    try {
      const res = await axios.post("/api/user/login", value, config);
      if(res.status===200){
       localStorage.setItem("token", res.data.token);
    //   dispatch(authActions.login(res.data.token));
      }
      
      if (res.data.token) {
        setNextPage(true);
      }
      setMessage(res.data.message);
    } catch (error) {
      
      setMessage(error.response.data.message);
      
    }
    
  };

  return (
    <div className={style.container}>
      {nextPage ? <Redirect to="/"></Redirect> : null}
      <div className={style.logo}>
      <Link to='/'> <img
          src="http://pngimg.com/uploads/amazon/small/amazon_PNG8.png"
          alt="logo"
        /></Link> 
      </div>
      <div className={style.mainBox}>
        <div className={style.box}>
          <form className={style.form}>
            <h2>Sign-In</h2>
            <h6 className={style.field}>Enter your Email</h6>
            <input
              className={style.input}
              type="email"
              required={true}
              onChange={handleChange}
              value={value.email}
              name="email"
            />
            <p className={style.warning}>{emptyEmail?emptyEmail:null}</p>
            <br />
            <h6 className={style.field}>Enter your Password</h6>
            <input
              className={style.input}
              type="password"
              required={true}
              autoComplete="cc-number"
              onChange={handleChange}
              value={value.password}
              name="password"
            />
            <p className={style.warning}>{emptyPassword?emptyPassword:null}</p>
            <br />
            <div className={style.buttonBox}>
              <button
                type="submit"
                onClick={handleClick}
                className={style.button}
              >
                Sign-In
              </button>
            </div>
          </form>
          <br />
          <p>By continuing, you agree to Amazon's Conditions of</p>
          <p>Use and Privacy Notice.</p>
          <br />

          <p>Need help?</p>
        </div>
        <p className={style.new}>New to Amazon?</p>
        <Link to="/signup">
          {" "}
          <button className={style.signUp}>Create your Amazon account</button>
        </Link>

        <p className={style.privacy}>
          Conditons of Use&nbsp;&nbsp;&nbsp; Privacy Notice
          &nbsp;&nbsp;&nbsp;Help
        </p>
        <p className={style.legal}>
          © 1996-2021, Amazon.com, Inc. or its affliates
        </p>
      </div>
      {message ? 
         
      <Modal  open={open} onClose={onCloseModal} center>
        
        <h2 className={style.modal}>{message}</h2>
      </Modal> :null}
    </div>
  );
};

export default Login;
