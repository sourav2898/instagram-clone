import React, {useState} from 'react'
import { Button, CircularProgress, FormControl, Input, InputLabel } from '@material-ui/core';
import './Login.css'

const Login = ({signin,handleOpenSignUp,loader}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    var emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;


    const login = (e) => {
        e.preventDefault();
        const val = validation();
        if(val){
            signin(email, password);
        }
    }

    const validation = () => {
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
        <form className="form" onSubmit={login}>
            <FormControl style={{margin:'10px'}} className="email">
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" type="email" value={email} onChange={(e) => {setEmail(e.target.value); setError({email:""})}} />
                {error?.email && <p className="error">{error?.email}</p>}
            </FormControl>
            <FormControl style={{margin:'10px'}} className="password">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" value={password} onChange={(e) => {setPassword(e.target.value);setError({password:""})}}/>
                {error?.password && <p className="error">{error?.password}</p>}
            </FormControl>
            <center>
            {
                loader 
                ?
                <CircularProgress color="secondary"/>
                :
                <>
                <Button style={{margin:'20px'}} className="login" type="submit"  variant="contained" color="primary"> Login </Button>
                <p className="not_user">
                    Not a user?
                    <Button className="signup" color="primary" onClick={handleOpenSignUp}>
                        Sign Up
                    </Button>
                </p>
                </>
            }
                
            </center>
        </form>
        </>
    )
}

export default Login
