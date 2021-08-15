import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Verify from './Pages/Verify/Verify'
import Checkout from './Pages/Checkout/Checkout'
import { Provider } from "react-redux";
import { productReducer } from "./store/reducers/products";
import { userReducer } from "./store/reducers/user";
import style from './App.module.css'

import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import './'

const App = () => {
  const rootReducer = {
    products: productReducer,
    user: userReducer
  };

  const reducer = combineReducers(rootReducer);
  const store = createStore(reducer, applyMiddleware(ReduxThunk));



  const products = localStorage.getItem("products");
  if (!products) {
    const empty = [];
    localStorage.setItem("products", JSON.stringify(empty));
  }
  const item = JSON.parse(localStorage.getItem("products"));
  const token = localStorage.getItem("token");

  return (
    <div>
      <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/signup' component={Signup}></Route>
          <Route exact path='/checkout' component={Checkout}></Route>
          <Route exact path='/verify/:id' component={Verify}></Route>
         
        </Switch>
      </Router>
      </Provider>
    </div>
  )
}

export default App
