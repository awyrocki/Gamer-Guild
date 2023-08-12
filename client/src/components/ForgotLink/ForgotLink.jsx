import React, { useState } from 'react';

const ForgotLink = () => {
const [userEmail, setUserEmail] = useState('');
const [newPassword, setNewPassword] = useState('');
const [message, setMessage] = useState('');
localStorage.setItem("session", true)
setTimeout(() => localStorage.clear(), 60000)


function handleUpdatePassword() {
    const url = `http://127.0.0.1:4000/user/recover/${userEmail}`

    const body = {

        "password": `${newPassword}` 

    };

    fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: new Headers({
        "Content-Type": "application/json"
        })
    })
    .then(res => res.json())
    .then(data => {
        setMessage(data.message)
        localStorage.setItem("session", false)
        setTimeout(() => window.location = "http://localhost:3000/login", 1000)
    })
    .catch(err => console.log(err))
}


return (
<div className='my-body'>
    <div className='main'>
    <form>
        <h2 className='enter'>Update Password by Email</h2>
        <label className='enter' htmlFor='Email'>
        Email:
        </label>
        <input
        className='my-input'
        type='text'
        id='userId'
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        />
        <div className='main'>
        <label className='enter' htmlFor='newPassword'>
            New Password:
        </label>
        <input
            className='my-input'
            type='password'
            id='newPassword'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
        />
        <div className='main'>
            <button className='my-button' onClick={e => {
                e.preventDefault();
                handleUpdatePassword()
            }}>
            Update Password
            </button>
        </div>
        {message && <div>{message}</div>}
        </div>
    </form>
    </div>
</div>
);
};

export default ForgotLink;
