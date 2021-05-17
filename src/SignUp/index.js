import { Button, CircularProgress, FormControl, Input, InputLabel } from '@material-ui/core';
import React, {useState} from 'react'
import './Signup.css'

const SignUp = ({loader,signup,handleOpen}) => {
    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState({});
    const [password, setPassword] = useState('');
    var emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

    const sign = (e) => {
      e.preventDefault();
      const valid = validation();
      if(valid){
        signup(email,password,username);  
      }
    }

    const validation = () => {
        if(!username || username.trim()===''){
            setError({
                username:"Please enter a username"
            })
            return false;
        }
        if(!email || email.trim()===''){
            setError({
                email : "Please enter an email"
            })
            // console.log(error);
            return false;
        }
        else if(email || email.trim()!==''){
            if(!emailCheck.test(email)){
                setError({
                    email : "Please enter a valid email"
                })
                // console.log(error);
                return false;
            }
        }
        if(!password || password.trim()===''){
            setError({
                password : "Please enter password"
            })
            // console.log(error);
            return false;
        }
        if((password || password.trim()!=='') && password.length<6){
            setError({
                password:"Password must be greater than six characters"
            })
            return false;
        }
        // console.log(error);
        return true;
    }


    return (
        <>
            <center>
                <img 
                    width="100px"
                    className="logo"
                    src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
                    alt="Instagram"
                />
            </center>
            <form className="form" onSubmit={sign}>
                <FormControl style={{margin:'10px'}} className="username">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" type="text" value={username} onChange={(e) => {setUsername(e.target.value);setError({})}} />
                    {error?.username && <p className="error">{error?.username}</p>}
                </FormControl>
                <FormControl style={{margin:'10px'}} className="email">
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input id="email" type="email" value={email} onChange={(e) => {setEmail(e.target.value);setError({})}} />
                    {error?.email && <p className="error">{error?.email}</p>}
                </FormControl>
                <FormControl style={{margin:'10px'}} className="password">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" value={password} onChange={(e) => {setPassword(e.target.value);setError({})}}/>
                    {error?.password && <p className="error">{error?.password}</p>}
                </FormControl>
                <center>
                {
                    loader
                    ?
                    <CircularProgress color="secondary"/>
                    :
                    <>
                    <Button style={{margin:'20px'}} className="signup" type="submit"  variant="contained" color="primary"> SignUp </Button>
                    <p className="not_user">
                        Already an user?
                        <Button className="signup" color="primary" onClick={handleOpen}>
                            Sign In
                        </Button>
                    </p>
                    </>
                }
                </center>
            </form>
        </>
    )
}

export default SignUp
