import React, { useState, useEffect } from "react";
import style from "./List.module.css";
import * as CurrenyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../axios";

const List = ({
  change,
  image,
  name,
  price,
  index,
  handleClick,
  qty,
  priceChange,
}) => {
  const dispatch = useDispatch();
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [defaults, setDefaults] = useState(1);

  const item = JSON.parse(localStorage.getItem("products"));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      const item = JSON.parse(localStorage.getItem("products"));

      const temp = item.map((item, i) => {
        if (i === index) {
          return {
            id: item.id,
            qty: defaults,
            price: item.price,
            totalPrice: defaults * price,
          };
        }

        return item;
      });

      localStorage.setItem("products", JSON.stringify(temp));
    }
  }, [qty, index, item, defaults, price]);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setDefaults(qty);
    }
  }, [user, qty]);

  const handleChange = (e) => {
    setDefaults(parseInt(e.target.value));
  };

  useEffect(() => {
    
    
    const token = localStorage.getItem("token");
    if(token){
      (async () => {
        try {
          const object = { defaults, index };
          const set = await axios.put("/api/user/addQty", object, {
            headers: {
              authorization: token,
            },
          });
          change(set);
        } catch (error) {
          console.log(error);
        }
      })()
    }
    if(!token){
       const products = JSON.parse(localStorage.getItem("products"))
      const sum = products.reduce((acc, product) =>acc+product.totalPrice,0)
      change(sum)
    }
  }, [qty, index, item, defaults]);

  const handle = () => {
    
  };

  return (
    <div key={index} className={style.container}>
      <div className={style.imageBox}>
        <img src={image} alt={name} className={style.image} />
      </div>

      <div className={style.color}>
        <div className={style.first}>
          <h3 className={style.name}>{name}</h3>
          <CurrenyFormat
            className={style.priceBox}
            value={defaults * price}
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
        <p>
          Gift options not available. <span>Learn more</span>
        </p>
        <div className={style.qtyBox}>
          <select
            onChange={handleChange}
            onClick={handle}
            value={defaults}
            id="option"
          >
            {options.map((label) => (
              <option value={label} id={label} key={label}>
                {label}
              </option>
            ))}
          </select>
          <div className={style.vertical}></div>
          <p onClick={() => handleClick(index)} className={style.delete}>
            Delete
          </p>
          <div className={style.vertical}></div>
          <p className={style.delete}> Save for later</p>
        </div>
        <span className={style.delete}>See more like this</span>
      </div>
    </div>
  );
};

export default List;
