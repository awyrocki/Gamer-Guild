import React, { useEffect } from 'react'

function ChangePassword({ newPass, passCheck}) {
    const userID = localStorage.getItem("id")
    const token = localStorage.getItem("token")

    // Changes users password
    function changePassword() {
        const url = `http://127.0.0.1:4000/user/updatepassword/${userID}`
        const body = {
            "password": `${newPass}` 
        };
    
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: new Headers({
            "Content-Type": "application/json",
            "authorization": token
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            localStorage.setItem("session", false)
            setTimeout(() => window.location = "http://localhost:3000/login", 1000)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if(newPass !== ""){
            changePassword()
        }
    }, [passCheck])

    return (
    <></>
    )
}

export default ChangePassword