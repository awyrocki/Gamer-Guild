import React, { useEffect, useState } from 'react'
import "./Guildlist.css"

function Guildlist() {

  const [ joinedGuilds, setJoinedGuilds ] = useState([])
  // grabs the user id from the local storage
  const userID = localStorage.getItem("id")

  const fetchJoinedGuilds = () => {
    const url = `http://127.0.0.1:4000/guild/${userID}`

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        // ! authorization goes here!
      })
    })
    .then(res => res.json())
    .then(data => setJoinedGuilds(data))
    .catch(err => console.log(err))
  }
  // grabs joined guilds when user logs in
  useEffect(() => {
    fetchJoinedGuilds()
  })

  return (
    <div id='guildlist-container'>
      {joinedGuilds.map((guild, i) => (
        <div key={i} className='joined-guild-list'>
          <h3>{guild.name}</h3>
          <p>{guild.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Guildlist