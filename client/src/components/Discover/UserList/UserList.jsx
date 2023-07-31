import React, { useEffect, useState } from 'react'
import "./UserList.css"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


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
        .then(data => {setUserProfiles(oldProfiles => [...oldProfiles, data.userName])})
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

// redirects to user profile page
function userProfile(user) {
    window.location = `http://localhost:3000/user?User=${user}`
}


    return (
        <>
        <div id='userlist-container'>
        <h2 id='user-title'>Users</h2>
        {userProfiles.map((user, i) => (
            <div key={i} className='user-list' onClick={e => userProfile(user)} >
            <List sx={{ width: '90%', maxWidth: 360, bgcolor: 'var(--body_color)' }}>
            <ListItem alignItems="center"   >
            <ListItemAvatar>
            <Avatar />
            </ListItemAvatar>
            <ListItemText
                primary={user}
                sx={{
                    color: "var(--text_color)",
                    cursor: "pointer",
                    ":hover": {
                        color: "var(--subtext_color)",
                        cursor: "pointer"
                    }
                }}
            />
            </ListItem>
            <Divider variant="inset" component="li" />
            </List>
        </div>
        ))}
        </div>
        </>
    )
}

export default UserList