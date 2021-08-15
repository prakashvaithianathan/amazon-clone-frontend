import React from 'react'
import style from './Empty.module.css'
import {Link} from 'react-router-dom'


const Empty = () => {
    return (
        <div className={style.empty}>
              <div>
                <img
                  src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg"
                  alt="amazon"
                  className={style.image}
                />
              </div>
              <div>
                <h2>Your Amazon Basket is empty</h2>
                <p className={style.link}>Shop today's deals</p>
                <div className={style.buttonList}>
               <Link to='/login'>  <button className={style.signIn}>Sign in to your account</button></Link> 
             <Link to='signup'> <button className={style.signUp}>Sign up now</button></Link>    
                </div>
              </div>
            </div>
    )
}

export default Empty
