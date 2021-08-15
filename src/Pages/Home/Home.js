import React,{useState,useEffect} from 'react'
import style from './Home.module.css'
import Header from './components/Header/Header'
import Items from './components/Items/Items'
import { useSelector,useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/user'
import {CircularProgress} from '@material-ui/core'

const Home = () => {
    
    //  const token = localStorage.getItem('token')
    //  if(!token){
    //      localStorage.setItem('token','')
    //  }
    const [value, setValue] = useState(0)
   const target=({data})=>{
       setValue(data.cartItems.length)
   }
   const [load, setLoad] = useState(false)
   setTimeout(()=>{
       setLoad(true)
   },1000)
    return (
          <div>
              {load ?
          
          <div>
            <Header value={value}></Header>
            <div className={style.item}>
            <Items target={target}></Items>
            </div>
            </div>

             : <div className={style.loader}> <CircularProgress ></CircularProgress></div>}
            
        </div>
    )
}

export default Home
