import React, { useState, useEffect } from "react";
import style from "./SubTotal.module.css";
import * as CurrenyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import { CheckCircle, Cancel } from "@material-ui/icons";

import axios from "../../../../axios";

const SubTotal = ({ value, index }) => {
  const { user } = useSelector((state) => state.user);

  const [state, setState] = useState(false);
  const [error, setError] = useState(false);
  const [paid, setPaid] = useState(false);
  const products = JSON.parse(localStorage.getItem("products"));
 

  const payment = async () => {
    try {
      const { data } = await axios.get(`/api/payment/order/${value}`);
      
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        name: "Amazon",
        description: "AMAZON",
        order_id: data.id,
        image:
          "data:image/png;base64,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",
        handler: async (response) => {
          try {
            const temp = {
              order_id: data.id,
              razorpay_paymeny_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
            await axios.post("/api/payment/verify", temp, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            
            
            setState(true);
            setPaid(true);
            onOpenModal();
            purchased()
          } catch (error) {
            setState(true);
            setPaid(false);
          }
        },
        theme: {
          color: "orange",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error.response.data.message);
      setError(true);
      onOpenModal();
    }
  };

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  function purchased(){
    const token = localStorage.getItem("token");
    (async()=>{
     await axios.get("/api/user/purchasedItem", {
       headers: { authorization: token },
     });
    })()
  }


  return (
    <div className={style.container}>
      <div className={style.imageBox}>
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
          alt="amazon"
        />
      </div>
      <div className={style.subBox}>
        <div className={style.subTotal}>
          <h3>Subtotal({index} item) :</h3>
          <CurrenyFormat
            value={JSON.stringify(value)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"???"}
            renderText={(price) => (
              <p className={style.price}>
                {price}
                .00
              </p>
            )}
          ></CurrenyFormat>
        </div>
        {user ? (
          <div>
            <button onClick={payment} className={style.btn}>
              Proceed to Buy
            </button>
          </div>
        ) : (
          <Link to="/login">
            {" "}
            <button className={style.btn}>
              Sign In and Proceed to Buy
            </button>{" "}
          </Link>
        )}
      </div>
      {error ? (
        <Modal open={open} onClose={onCloseModal} center>
          <Cancel className={style.wrong}></Cancel>
          <h1
            className={style.modal}
            style={{ color: "red", textAlign: "center" }}
          >
            Something went wrong! Transaction must be below 5 lakh only
          </h1>
        </Modal>
      ) : null}

      {state ? (
        paid ? (
          <Modal open={open} onClose={onCloseModal} center>
            <CheckCircle className={style.tick}></CheckCircle>
            <h1
              className={style.modal}
              style={{ color: "green", textAlign: "center" }}
            >
              Your Payment was success! Thank you for your purchase
            </h1>
          </Modal>
        ) : (
          <Modal open={open} onClose={onCloseModal} center>
            <Cancel className={style.wrong}></Cancel>
            <h1
              className={style.modal}
              style={{ color: "red", textAlign: "center" }}
            >
              Payment Failed
            </h1>
          </Modal>
        )
      ) : null}
    </div>
  );
};

export default SubTotal;
