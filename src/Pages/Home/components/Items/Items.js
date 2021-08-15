import React, { useEffect, useState } from "react";
import style from "./Items.module.css";
// import data from "./data.json";
import Box from "./Box/Box";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  specificProducts,
} from "../../../../store/actions/products";
import axios from "../../../../axios";
import { CircularProgress } from "@material-ui/core";


const Items = ({target}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const datas = JSON.parse(localStorage.getItem("products"));

    if (datas) {
      dispatch(setProducts(datas));
    }
  }, [dispatch]);

  const [defaults, setDefaults] = useState(true);
  const { initial } = useSelector((state) => state.products);
  const a = useSelector((state) => state.products);
   
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!initial) {
      (async () => {
        try {
          const { data } = await axios.post("/api/product/getProduct", {
            headers: {
              "Content-Type": "application/json",
            },
          });
           
          setData(data);
        } catch (error) {
          setDefaults(false);
        }
      })();
    }
  }, [initial]);

  useEffect(() => {
    if (initial) {
      setData(initial);
    }
  }, [initial]);

  

  return (
    <div>
      {data.length>0 ? defaults ? (
        <div>
          <img
            className={style.ads}
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/AugART21/GW/NEW/HERO/PC/1day/AugART21_PC_hero_1x_FDFO_1day._CB645396058_.jpg"
            alt="amazon ads"
          />
          <Grid
            xs={12}
            justifyContent="center"
            item
            container
            className={style.grid}
          >
            {data.length > 0 ? (
              data.map(({ image, name, price, _id, qty }, index) => {
                return (
                  <Box
                  target={target}
                    id={_id}
                    index={index}
                    key={index}
                    image={image}
                    name={name}
                    price={price}
                    qty={qty}
                  ></Box>
                );
              })
            ) : (
              <div>
                <CircularProgress
                  className={style.loader}
                  color="secondary"
                ></CircularProgress>
              </div>
            )}
          </Grid>
        </div>
      ) : (
        <div>
          <CircularProgress
            className={style.loader}
            color="secondary"
          ></CircularProgress>
        </div>
      ):null}
    </div>
  );
};

export default Items;
