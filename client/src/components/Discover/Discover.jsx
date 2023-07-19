import React, { useEffect, useState } from 'react'
import "./Discover.css"

// add sessiontoken
function Guild({ setGuildName }) {

    const [ allGuild, setAllGuild ] = useState([])

    const fetchGuild = () => {
        const url = "http://127.0.0.1:4000/guild/"

        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application.json"
                // Render all guilds regardless of authorization
            })
        })
        .then(res => res.json())
        .then(data => setAllGuild(data))
        .catch(err => console.log(err))
    }

    // get initial list of guilds
    useEffect(() => {
        fetchGuild()
    })

  return (
    <>
        <div id='discover-container'>
            {allGuild.map((guild, i) => {
                <div key={i} className='guild-list' >
                    <h3 onClick={e => {
                        e.preventDefault()
                        setGuildName(guild.name)
                    }}>{guild.name}</h3>
                </div>
            })}
        </div>
    </>
  )
}

export default Guild