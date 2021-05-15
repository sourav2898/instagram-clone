import React, {useState} from 'react'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './Login.css'

const Login = ({signin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();
        signin(email, password);
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
                <Input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl style={{margin:'10px'}} className="password">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </FormControl>
            <center>
                <Button style={{margin:'20px'}} className="login" type="submit"  variant="contained" color="primary"> Login </Button>
                <p className="not_user">
                    Not a user?<Button color="primary" > Sign up </Button>
                </p>
            </center>
        </form>
        </>
    )
}

export default Login
