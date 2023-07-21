import React, { useEffect, useState } from 'react'
import "./Discover.css"

// add sessiontoken
function Guild() {

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
    const url = "http://127.0.0.1:4000/guild/"
}

function askJoin() {
    setJoin(
        <>
        <h3>{`Join? ${guild}`}</h3>
        <button>join?</button>
        <button onClick={e => {
            e.preventDefault()
            setJoin(<></>)
            setGuild("")
            setGuildId("")
        }}>Cancel</button>
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
            {allGuild.map((guild, i) => (
                <div key={i} className='guild-list' >
                    <h3 onClick={e => {
                        // e.preventDefault()
                        setGuild(e.target.innerHTML)
                        setGuildId(e.target.id)
                    }} id={guild._id} >{guild.name}</h3><p>{guild.description}</p>
                </div>
            ))}
        </div>
        {console.log(guildId)}
        {join}
    </>
  )
}

export default Guild