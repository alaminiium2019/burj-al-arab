import * as firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';


const Login = () => {

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const {from}=location.state||{from:{pathname:"/"}};


    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(res => {
            const {displayName, email} = res.user;
            const signedInUser = {name: displayName,email};
            setLoggedInUser(signedInUser);
            storeAuthToken();
            history.replace(from);
            
  
          }).catch(error => {
            
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode,errorMessage);
           
          });

   }

   const storeAuthToken = ()=> {
       firebase.auth().currentUser.getIdToken(true)
       .then(function(idToken){
           //console.log(idToken)
           sessionStorage.setItem('token',idToken);

       }).catch(function(error){

       })
   }

    return (
        <div>
            <h1>This is Login here</h1>
            
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;