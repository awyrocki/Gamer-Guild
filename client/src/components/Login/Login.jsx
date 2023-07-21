import React, {useState} from 'react';
import './Login.css'

function Login( {updateLocalStorage} ) {
    const [ first, setFirst ] = useState("")
    const [ last, setLast ] = useState("")
    const [ user, setUser ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

function signUp1() {
        
        let item={ 
            "firstName": first, 
            "lastName": last,
            "userName": user, 
            "password": password, 
            "email": email
        }
    fetch("http://localhost:4000/user/register", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: new Headers ({
                "Content-Type":"application/json"
            })
        })
        .then(res => res.json())
        .then(data => updateLocalStorage(data.token))

    }

function loginUser() {

    let body ={
        "email": email,
        "password": password
    }
    fetch("http://localhost:4000/user/Login", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers ({
            "Content-Type": "application/json"
        })
    })
    .then(res => res.json())
    .then(data => updateLocalStorage(data.token))

}

return (
    <div className='my-body'>
<div className="main">
    <input className='my-input' type="checkbox" id="chk" aria-hidden="true" />

    <div className="login">
    <form method='post'>
        <label className='my-label' htmlFor="chk" aria-hidden="true">Gamer Guild</label>
        <h1 className='enter'>Login</h1>
        <input className='my-input' type="email" onChange={(e)=> setEmail(e.target.value)} name="email" placeholder="Email" required="" />
        <input className='my-input' type="password" onChange={(e)=> setPassword(e.target.value)} name="pswd" placeholder="Password" required="" />
        <button className='my-button' onClick={e => {
            e.preventDefault()
            loginUser()
        }}>Login</button>
<a className='my-button' href='http://localhost:3000/Recover'>Forgot password</a>
    </form>
    </div>

    <div className="signup">
    <form method='post'>
        <label className='my-label' htmlFor="chk" aria-hidden="true">Sign up</label>
        <input className='my-input' type="text"onChange={(e)=> setFirst(e.target.value)} name='text' placeholder='First Name' required=""/>
        <input className='my-input' type="text"onChange={(e)=> setLast(e.target.value)} name='text' placeholder='Last Name' required=""/>
        <input className='my-input' type="text"onChange={(e)=> setUser(e.target.value)} name="txt" placeholder="User name" required="" />
        <input className='my-input' type="email"onChange={(e)=> setEmail(e.target.value)} name="email" placeholder="Email" required="" />
        <input className='my-input' type="password"onChange={(e)=> setPassword(e.target.value)} name="pswd" placeholder="Password" required="" />
        <button className='my-button' onClick={e => {
            e.preventDefault()
            signUp1()
            setFirst("")
            setLast("")
            setUser("")
            setEmail("")
            setPassword("")
        }}>Sign up</button>
    </form>
    </div>
</div>
</div>
);
}

export default Login;