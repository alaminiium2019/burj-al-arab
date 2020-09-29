import * as firebase from "firebase/app";
import "firebase/auth";
import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Book from './components/Book/Book';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser]=useState({});

  const handleSignOut=()=>{
    firebase.auth().signOut()
    .then(res => {
        // Sign-out successful.
        const signedOut = {
            displayName:'',
            email:''
        };
        setLoggedInUser(signedOut);
      }).catch(error => console.log(error) 
        // An error happened.
      );
   }

  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <p>Name: {loggedInUser.name}</p>
      {/* <button onClick={handleSignOut}>Sign Out</button> */}
      <Router>
          <Header/>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/book/:bedType">
              <Book />
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
