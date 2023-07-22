import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    const navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        // console.log({email:credentials.email,password:credentials.password});
        const response = await fetch(`http://localhost:8000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();
        // console.log(json);
        if(json.success){
            localStorage.setItem("token",json.authenToken);
            localStorage.setItem("userName",json.uName);
            props.showalert("User login successfully","success");
            navigate('/home');
            // history.push("/");
        }
        else{
            props.showalert("Invalid email or password","danger");
        }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
        // console.log({email:credentials.email,password:credentials.password});
    }
    
    // function handlelogin(){
    //     let invalidemail=document.getElementById('invalidemail');
    //     let invalidpassword=document.getElementById('invalidpassword');
    //     let email=document.getElementById('email').value;
    //     let password=document.getElementById('password').value;
    //     if(email===""){
    //         invalidemail.innerHTML="Please enter email";
    //     }
    //     else if(password===""){
    //         invalidpassword.innerHTML="Please enter password";
    //     }
    // }
    return (
        <div>
            <form onSubmit={handleSubmit} style={{marginTop:'14px'}}>
                <h3 style={{textAlign:'center'}}>Login Here:</h3>
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">Email</label>
                  <input type="Email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange}/>
                  <small id='invalidemail' style={{color:"red"}}></small>
                </div>
                <div className="mb-3">
                  <label htmlFor="Password" className="form-label">Password</label>
                  <input type="Password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
                  <small id='invalidpassword' style={{color:"red"}}></small>
                </div>
                <button type="submit" className="btn" style={{backgroundColor:"black",color:"white"}} > Login</button>
            </form>
        </div>
    );
}

export default Login;