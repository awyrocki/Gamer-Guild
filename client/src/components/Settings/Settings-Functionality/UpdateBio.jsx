import React, { useEffect } from 'react'

function UpdateBio({ bio, checkMark}) {
    const userID = localStorage.getItem("id")
    const token = localStorage.getItem("token")

    function bioUpdate() {
        const url = `http://127.0.0.1:4000/user/update/${userID}`
        const body = {
            "bio": `${bio}` 
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
            setTimeout(() => window.location = "http://localhost:3000/", 1000)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if (bio !== "") {
            bioUpdate()
        }
    },[checkMark])

    return (
    <></>
    )
}

export default UpdateBio