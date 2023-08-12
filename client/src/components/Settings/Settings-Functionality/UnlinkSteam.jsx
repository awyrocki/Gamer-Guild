import React, { useEffect } from 'react'

function UnlinkSteam({ disSteam }) {
    const userID = localStorage.getItem("id")
    const token = localStorage.getItem("token")

    // Unlinks steam account
    function unlink() {
        const url = `http://127.0.0.1:4000/user/update/${userID}`
        const body = {
            "steamId": "",
            "profilePic": "https://cdn.vectorstock.com/i/preview-1x/70/84/default-avatar-profile-icon-symbol-for-website-vector-46547084.jpg"
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
            localStorage.setItem("steamID", "")
            setTimeout(() => window.location = "http://localhost:3000/", 1000)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
    if(disSteam === false) {

        unlink()
    }
    }, [disSteam])

    
    return (
    <></>
    )
}

export default UnlinkSteam