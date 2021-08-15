import React, { useState, useEffect } from "react";
import style from "./Checkout.module.css";
import Header from "../Home/components/Header/Header";
import List from "./components/List/List";
import Empty from "./components/Empty/Empty";
import SubTotal from "./components/SubTotal/SubTotal";
import * as CurrenyFormat from "react-currency-format";
import axios from "../../axios";
import { deleteProducts } from "../../store/actions/products";
import { useDispatch, useSelector } from "react-redux";
import {addUser} from '../../store/actions/user'

const Checkout = () => {
  const dispatch = useDispatch();
  //check for token, If not token means display localstorage. If token means display user cart area.
  const token = localStorage.getItem("token");
  const [value, setValue] = useState([]);

  const products = JSON.parse(localStorage.getItem("products"));
  const getOnlyId = products.map((item) => item.id);
  const setObject = {
    getOnlyId,
  };

  const { user } = useSelector((state) => state.user);

  const [reload, setReload] = useState(false);

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products"));
    const a = products.reduce((acc, item) => {
      return acc + item.totalPrice;
    }, 0);
    setPrice(a);
  }, []);

  const handleClick = (id) => {
    
    const token = localStorage.getItem("token");

    if (!token) {
      setValue((prev) => {
        let temp = prev.filter((item, index) => {
          return index !== id;
        });
        dispatch(deleteProducts(temp));
        return temp;
      });
    }

    const temp = value.filter((item, index) => {
      return index === id;
    });
    const extractId = temp.map((item, index) => {
      return item._id;
    });
    const obj = {
      id: extractId[0],
      index: id,
    };

    if (token) {
      (async () => {
        try {
          const deleteItem = await axios.put("/api/user/deleteItem", obj, {
            headers: {
              authorization: token,
            },
          });
          

          const getOnlyId = deleteItem.data.cartItems.map((item) => item.id);
          const setObject = { getOnlyId };

          const getData = await axios.post("/api/product/cart", setObject, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const qty =user.data.data.cartItems.map(item=>item.qty);
          const final = getData.data.map((item,i)=>{
            return {
                  qty:qty[i],
                  _id:item._id,
                  name:item.name,
                  price:item.price,
                  image:item.image
            }
          });
          
          setValue(final);










          
          
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  useEffect(() => {
    if (!token) {
      (async () => {
        try {
          const getData = await axios.post("/api/product/cart", setObject, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          setValue(getData.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
    
    if (token && user) {
      (async () => {
        try {
          const getOnlyId = user.data.data.cartItems.map((item) => item.id);
          const setObject = { getOnlyId };

          const getData = await axios.post("/api/product/cart", setObject, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const qty =user.data.data.cartItems.map(item=>item.qty);
          const final = getData.data.map((item,i)=>{
            return {
                  qty:qty[i],
                  _id:item._id,
                  name:item.name,
                  price:item.price,
                  image:item.image
            }
          });
          
          setValue(final);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [token, user, reload]);

  useEffect(()=>{
    
  },[user])
  
  const change=(data)=>{
   
    if(user){
      
      (async()=>{
        try {
          
          
          const extractedPrice = data.data.cartItems.map((item)=>{
           return  item.qty*item.price
          })
          
          const sum = extractedPrice.reduce((acc,item)=>{return acc+item},0)
          
         
          setPrice(sum);
        } catch (error) {
          console.log(error);
        }
      })()
     
      }
      if(!token){
        setPrice(data)
      }

  }
  // console.log(price);


  return (
    <div>
      <Header value={value.length}></Header>
      <div className={style.grid}>
        <div className={style.mainContainer}>
          {value ? (
            value.length > 0 ? (
              <div className={style.list}>
                <div className={style.title}>
                  <h2>Shopping Cart</h2>
                  <p>Price</p>
                </div>
                {/* <div className={style.line}></div> */}
                <div className={style.container}>
                  {value.map(({ image, name, price, qty }, index) => {
                    return (
                      <div key={index} className={style.top}>
                        <List
                        change={change}
                          handleClick={handleClick}
                          key={index}
                          image={image}
                          name={name}
                          price={price}
                          index={index}
                          qty={qty}
                        ></List>

                        <div className={style.lineAfter}></div>
                      </div>
                    );
                  })}
                </div>
                <div className={style.line}></div>

                <div className={style.subBox}>
                  <h3>Subtotal({value.length} item):</h3>
                  <CurrenyFormat
                    value={JSON.stringify(price)}
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
              </div>
            ) : (
              <div className={style.empty}>
                <Empty></Empty>
              </div>
            )
          ) : (
            <div className={style.empty}>
              <Empty></Empty>
            </div>
          )}
        </div>
        {value && value.length > 0 ? (
          <div className={style.subTotalBox}>
            <SubTotal index={value.length} value={price}></SubTotal>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Checkout;
