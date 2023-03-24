import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        // console.log({email:credentials.email,password:credentials.password});
        const response = await fetch(`http://localhost:8000/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,cpassword:credentials.cpassword})
        });
        const json=await response.json();
        // console.log(json);
        if(credentials.name!==""&&credentials.email!==""&&credentials.password!==""&&credentials.cpassword!==""){
            if(json.success && json.typeSuccess==="accountcreated"){
                // localStorage.setItem("token",json.authtoken);
                props.showalert("Account created successfully","success");
                navigate('/login');
                // history.push("/");
            }
            else{
                if(json.typeSuccess==="alreadyexists"){
                    props.showalert("Email already exists, please try another account","danger");
                }
                else if(json.typeSuccess==="passwordsnotmatch"){
                    props.showalert("Password and confirm password are not match","danger");
                }
            }
        }
        else{
            props.showalert("Please fill all the fields","danger");
        }
        
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    return (
        <div>
            <form onSubmit={handleSubmit} style={{marginTop:'14px'}}>
                <h3 style={{textAlign:'center'}}>Sign Up Here:</h3>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">Email</label>
                  <input type="Email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="Password" className="form-label">Password</label>
                  <input type="Password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                  <input type="Password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange}/>
                </div>
                <button type="submit" className="btn" style={{backgroundColor:"black",color:"white"}}> Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
