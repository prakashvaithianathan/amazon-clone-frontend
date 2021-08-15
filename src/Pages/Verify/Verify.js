import React, { useState, useEffect } from "react";
import style from "./Verify.module.css";
import { useParams,Redirect } from "react-router-dom";
import axios from '../../axios';
import { CheckCircleOutline } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

const Verify = () => {
  const [verify, setVerify] = useState("");
  const  {id}  = useParams();
  
    useEffect(() => {
      axios
        .get("/api/user/verify", { headers: { "authorization": id } })
        .then((res) =>{ 
            
            setVerify(res.data.message)})
        .catch((err) => setVerify(err.response.data.message));
    }, [id]);

    const [state, setState] = useState(false)

    setTimeout(() => {
        setState(true)
    }, 2000);
   
  return (
    <div>
      {verify ? (
        <div className={style.container}>
          <CheckCircleOutline
            fontSize="large"
            className={style.tick}
          ></CheckCircleOutline>
          <h1>{verify}</h1>
          {state?<Redirect to='/login'></Redirect>:null}
        </div>
       
      ) : (
        <div>
          <CircularProgress
            className={style.loader}
            color="secondary"
          ></CircularProgress>
        </div>
      )}
    </div>
  );
};

export default Verify;
