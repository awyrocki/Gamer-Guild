import React, {useState} from 'react';
import './Login.css'

function Login() {
    const [ first, setFirst ] = useState("")
    const [ last, setLast ] = useState("")
    const [ user, setUser ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")


//     // Submit registration form
// let signUp1 = async e => {
// e.preventDefault();
// let url = "https://localhost:4000/user/register";
// let body = { first, last, user, email, password, };

// try {
//     let response = await fetch(url, {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers: new Headers({
//         "Content-Type": "application/json"
//     })
//     });
//     let data = await response.json();
//     if (!data.token) throw Error(data.message);
//     window.alert("User registered");
// } catch (err) {
//     window.alert(err);
// }
// };
async function signUp1() {
        
        let item={ 
            "firstName": first, 
            "lastName": last,
            "userName": user, 
            "password": password, 
            "email": email
        }
        if (!first || !last || !user || !password || !email) throw Error ("Please provide all details")
    let result = await fetch("http://localhost:4000/user/register", {
            method: 'POST',
            body:JSON.stringify(item),
            headers: new Headers ({
                "Content-Type":"application/json"
            })
        })
        .then(res => res.json())
        result = await result.json()
        console.log("result", result)
    }


return (
<div className="main">
    <input type="checkbox" id="chk" aria-hidden="true" />

    <div className="login">
    <form>
        <label htmlFor="chk" aria-hidden="true">Gamer Guild</label>
        <h1 className='enter'>Login</h1>
        <input type="email" name="email" placeholder="Email" required="" />
        <input type="password" name="pswd" placeholder="Password" required="" />
        <button>Login</button>
        <button className='forgot' href='http://localhost:3000/Recover' >Forgot password</button>
    </form>
    </div>

    <div className="signup">
    <form>
        <label htmlFor="chk" aria-hidden="true">Sign up</label>
        <input type="text"onChange={(e)=> setFirst(e.target.value)} name='text' placeholder='First Name' required=""/>
        <input type="text"onChange={(e)=> setLast(e.target.value)} name='text' placeholder='Last Name' required=""/>
        <input type="text"onChange={(e)=> setUser(e.target.value)} name="txt" placeholder="User name" required="" />
        <input type="email"onChange={(e)=> setEmail(e.target.value)} name="email" placeholder="Email" required="" />
        <input type="password"onChange={(e)=> setPassword(e.target.value)} name="pswd" placeholder="Password" required="" />
        <button onClick={signUp1}>Sign up</button>
    </form>
    </div>
</div>
);
}

export default Login;