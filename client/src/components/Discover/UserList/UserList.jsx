import React, { useEffect, useState } from 'react'
import "./UserList.css"

function UserList({ GuildName }) {
    const [ guildUsers, setGuildUsers ] = useState([])
    const [ userProfiles, setUserProfiles ] = useState ([])
    const [ go, setGo ] = useState(false);
    const token = localStorage.getItem("token")

function fetchUsers() {
    const url = `http://127.0.0.1:4000/guild/guild/${GuildName}`

    fetch(url, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json"
            // ! token
        })
    })
    .then(res => res.json())
    .then(data => {
        setGuildUsers(data)
        setGo(true)
    })
    .catch(err => console.log(err))
}

function getUserProfile() {
    guildUsers.forEach(user => {
        let url = `http://127.0.0.1:4000/user/${user}`
        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": token
            })
        })
        .then(res => res.json())
        .then(data => setUserProfiles(oldProfiles => [...oldProfiles, data.userName]))
        .catch(err => console.log(err))
    })
}

useEffect(() => {
    fetchUsers()
    if(GuildName){
    }
}, [])

useEffect(() => {
    if(guildUsers) {
        getUserProfile()
    }
}, [go])


    return (
        <>
        <div id='userlist-container'>
        <h2 id='user-title'>Users</h2>
        {userProfiles.map((user, i) => (
            <div key={i} className='user-list'>
                <h3 className='listed-users' >{user}</h3>
        </div>
        ))}
        </div>
        </>
    )
}

export default UserList