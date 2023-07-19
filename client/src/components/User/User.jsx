import React, { useEffect, useState } from 'react'
import Steam from '../Steam/Steam';
import "./User.css"

function User({ userID, steamID, isLinked }) {
  const [ userProfile, setUserProfile ] = useState(null);
  const [ render, setRender ] = useState(false)

  const fetchUser = () => {
      const url = `http://127.0.0.1:4000/user/${userId}`

      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application.json"
      })
    })
    .then(res => res.json())
    .then(data => setUserProfile(data))
    .catch(err = console.log(err))
  }

  const fetchSteamUser = () => {
    const url = `http://127.0.0.1:4000/user/${steamId}`
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application.json"
    })
  })
  .then(res => res.json())
  .then(data => setUserProfile(data))
  .catch(err = console.log(err))
      
  }

  useEffect(() => {
    if(!isLinked){
      fetchUser()
    } else {
      fetchSteamUser()
    }
  }, [])

  
  return (
    <div id='profile-container'>
      {console.log(userProfile)}
        <div id='placeholder'>
            Place steam image here
        </div>
        <h2 id='steam-name'>Steam name</h2>
        <span id='bio'>Hey all, my name is Austin, I like to play MMOs and MOBAs</span>
    </div>
  )
}

export default User