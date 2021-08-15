import React, { useState, useEffect } from "react";
import style from "./Box.module.css";
import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../../../../store/actions/products";
import * as CurrenyFormat from "react-currency-format";
import axios from "../../../../../axios";

const Box = ({ id,image, name, price, index,qty,totalPrice=(qty*price),target }) => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const {user} = useSelector(state => state.user)
  
  const handleClick = ({id, image, name, price, quantity,qty }) => {
      
    
    const checkUnique = JSON.parse(localStorage.getItem('products'))
    const extractId = checkUnique.map(item=> item.id)
    
     if(!extractId.includes(id)){
      dispatch(addProducts({id,image,qty, name, price, quantity }));
     }

     const token = localStorage.getItem('token')

     if(token){
      dispatch(addProducts({id,image,qty, name, price, quantity }));
      (async()=>{
        try {
          const {data} = await axios.get('/api/user/data',{
            headers:{
              authorization: token,
            }
          })
          target(data);
        } catch (error) {
          console.log(error);
        }
      })()
      // console.log(user.data.data.cartItems);
      
     }
   
  };

  return (
    <div key={index} className={style.container}>
      <img src={image} className={style.image} />
      <h5 className={style.name}>{name}</h5>
      <div className={style.priceContainer}>
        <span className={style.span}>Price: </span>
        
        <CurrenyFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₹"}
          renderText={(price) => (
            <p className={style.price}>
              {price}
              .00
            </p>
          )}
        ></CurrenyFormat>
      </div>

      <div className={style.bottom}>
        
        <button onClick={() => handleClick( {id,qty,price})} className={style.button}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Box;
