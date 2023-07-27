import React, { useEffect, useState } from 'react'
import "./Discover.css"

// add sessiontoken
function Discover() {

    const [ allGuild, setAllGuild ] = useState([])
    const [ join, setJoin ] = useState(<></>)
    const [ guild, setGuild ] = useState("")
    const [ guildId, setGuildId ] = useState("") 
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

function joinGuild() {
    const url = `http://127.0.0.1:4000/guild/update/${guildId}`
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
        setTimeout(() => window.location = (`http://localhost:3000/home?GuildName=${guild}`), 1000 )
        })
        .catch(err => console.log(err))
    
}

// renders buttons for join
function askJoin() {
    setJoin(
        <>
        <div id='join-container'>
        <h3>{`Join ${guild}?`}</h3>
        <button onClick={e => {
            e.preventDefault()
            joinGuild()
        }}>join?</button>
        <button onClick={e => {
            e.preventDefault()
            setJoin(<></>)
            setGuild("")
            setGuildId("")
        }}>Cancel</button>
        </div>
        </>
    )
}

useEffect(() => {
    if(guild !== "") {
        askJoin()
    }
}, [guild])

  return (
    <>
        <div id='discover-container'>
        <h3 id='discover-title'>Discover</h3>
        <hr />
            {allGuild.map((guild, i) => (
                <div key={i} className='guild-list' >
                    <h3 onClick={e => {
                        // e.preventDefault()
                        setGuild(e.target.innerHTML)
                        setGuildId(e.target.id)
                    }} id={guild._id} className='guild' >{guild.name}</h3><p id='guild-description'>{guild.description}</p>
                </div>
            ))}
        </div>
        {join}
    </>
  )
}

export default Discover