import React, { useEffect } from 'react'

function LeaveGuild({ leaveFlag }) {
    const id = localStorage.getItem('id')
    const queryParameters = new URLSearchParams(window.location.search)
    const GuildName = queryParameters.get("GuildName")

    function leave() {
        const url = `http://localhost:4000/guild/leaveguild/${GuildName}`
        const body = {
            user: id
        }
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: new Headers({
            "Content-Type": "application/json"
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTimeout(() => window.location = "http://localhost:3000/", 500)
        })
    }
    
useEffect(() => {
    if(leaveFlag === true)
    leave()
},[leaveFlag])
    return (
    <></>
    )
}

export default LeaveGuild