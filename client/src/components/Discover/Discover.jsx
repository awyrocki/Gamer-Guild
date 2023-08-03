import React, { useEffect, useState } from 'react'
import "./Discover.css"
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';

// add sessiontoken
function Discover() {
    const queryParameters = new URLSearchParams(window.location.search)
    const GuildName = queryParameters.get("GuildName")

    const [ allGuild, setAllGuild ] = useState([])
    const [ guild, setGuild ] = useState("")
    const userID = localStorage.getItem("id")

    const fetchGuild = () => {
        const url = "http://127.0.0.1:4000/guild/"

        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
                // Render all guilds regardless of authorization
            })
        })
        .then(res => res.json())
        .then(data => {
            // filters already joined guilds
            let notJoined = data.filter(guild => !guild.addedUsers.includes(userID))
            setAllGuild(notJoined)
        })
        .catch(err => console.log(err))
    }

    // get initial list of guilds
    useEffect(() => {
        fetchGuild()
    }, [])

function joinGuild(id) {
    const url = `http://127.0.0.1:4000/guild/update/${id}`
    const body = {
        "addedUsers": `${userID}` 
    };

    console.log(body)
            fetch(url, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: new Headers({
                "Content-Type": "application/json",
                authorization: ""
                })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        setTimeout(() => window.location = (`http://localhost:3000/?GuildName=${GuildName}`), 1000 )
        })
        .catch(err => console.log(err))
    
}

// displays the ask button if user is not in guild
function notJoined() {
    let found = allGuild.filter(guild => guild.name === GuildName)
    if (found.length > 0) {
        return <>
        <div id='restricted'>
        <div id='join-container'>
        <Typography
        fontSize={'1em'}
        color={"var(--text_color)"}
        >{`Join ${GuildName}?`}
        </Typography>
        <Stack direction="row" spacing={1} alignItems={'center'} justifyContent={'center'}>
        <IconButton>
            <CheckIcon
            sx={{color:"var(--text_color)"}}
            onClick={e => {
                e.preventDefault()
                joinGuild(found[0]._id)
            }}
            />
        </IconButton>
        <IconButton>
            <CloseIcon
            sx={{color:"var(--text_color)"}}
            onClick={e => {
                e.preventDefault()
                setTimeout(() => window.location = (`http://localhost:3000/`), 100 )
            }}
            />
        </IconButton>
        </Stack>
        </div>
        </div>
        </>
    }
}

// redirects to guild page
useEffect(() => {
    if (guild !== "") {
        setTimeout(() => window.location = (`http://localhost:3000/?GuildName=${guild}`), 200 )
    }
}, [guild])

    return (
    <>
        {notJoined()}
        <div id='discover-container'>
        <h3 id='discover-title'>Discover</h3>
        <hr />
            {allGuild.map((guild, i) => (
                <div key={i} className='guild-list' >
                    <h3 onClick={e => {
                        e.preventDefault()
                        setGuild(e.target.innerHTML)
                    }} id={guild._id} className='guild' >{guild.name}</h3><p id='guild-description'>{guild.description}</p>
                <hr />
                </div>
            ))}
        </div>
    </>
    )
}

export default Discover