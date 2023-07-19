import React from 'react';
import './Login.css'

function Login() {
return (
<div className="main">
    <input type="checkbox" id="chk" aria-hidden="true" />

    <div className="signup">
    <form>
        <label htmlFor="chk" aria-hidden="true">Gamer Guild</label>
        <h1 className='enter'>Login</h1>
        <input type="email" name="email" placeholder="Email" required="" />
        <input type="password" name="pswd" placeholder="Password" required="" />
        <button>Login</button>
        <button className='forgot' href='http://localhost:3000/Recover' >Forgot password</button>
    </form>
    </div>

    <div className="login">
    <form>
        <label htmlFor="chk" aria-hidden="true">Sign up</label>
        <input type="text" name='text' placeholder='First Name' required=""/>
        <input type="text" name='text' placeholder='Last Name' required=""/>
        <input type="text" name="txt" placeholder="User name" required="" />
        <input type="email" name="email" placeholder="Email" required="" />
        <input type="password" name="pswd" placeholder="Password" required="" />
        <button>Sign up</button>
    </form>
    </div>
</div>
);
}

export default Login;