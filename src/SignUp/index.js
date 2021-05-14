import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, {useState} from 'react'
import './Signup.css'

const SignUp = ({signup}) => {
    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const sign = (e) => {
      e.preventDefault();
      signup(email,password,username);  
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
                    <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormControl>
                <FormControl style={{margin:'10px'}} className="email">
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl style={{margin:'10px'}} className="password">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FormControl>
                <center>
                    <Button style={{margin:'20px'}} className="signup" type="submit"  variant="contained" color="primary"> SignUp </Button>
                </center>
            </form>
        </>
    )
}

export default SignUp
