import React, { useEffect, useState } from 'react'
import Steam from '../Steam/Steam';
import profilePic from "./default-profile.jpg"
import "./User.css"

function User() {
  const [ userProfile, setUserProfile ] = useState(null);
  const [ status, setStatus ] = useState("")
  const userId = localStorage.getItem("id")
  const steamID = localStorage.getItem("steamID")
  const userName = localStorage.getItem("user-name")


  // Checks users online status pushes to db for site wide access
  useEffect(() => {
    if(steamID) {
    const url = `http://localhost:4000/onlineStatus/${steamID}`

    fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json"
        })
    })
    .then(res => res.json())
    .then(data => setStatus(data.response.players[0].personastate))
    }
}, [])
  
  // if user isnt linked to steam gets their regular profile
  function fetchUser() {
      const url = `http://localhost:4000/user/${userId}`

      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json"
      })
    })
    .then(res => res.json())
    .then(data => setUserProfile(data))
  }

  // if user is linked to steam grabs that profile
  function fetchSteamUser() {
    const url = `http://localhost:4000/steamUser/${steamID}`
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
    })
  })
  .then(res => res.json())
  .then(data => setUserProfile(data))
  }

  useEffect(() => {
      if(steamID === null){
        fetchUser()
      } else {
        fetchSteamUser()
      }
  }, [])

function whichPic() {
  return steamID 
  ? userProfile.avatar
  : profilePic
}
// displays online status using steam
// ! not sure how to implement this to other users
function onlineStatus() {
  if (!steamID) {
    return <p></p>
  } else {
    return status === 0
    ? <><p>Offline</p><span id='status-light-off'></span></>
    : status === 1
    ? <><p>Online</p><span id='status-light-on'></span></>
    : <p></p>
  }
}
function renderUser() {
  return !userProfile
    ? <h2>Loading User</h2>
    : userProfile
    ? <><h3 id='user-name'>{userName}</h3> 
      <div id="profile-pic"><img src={whichPic()} alt="profile picture" width="75px" /> </div>
      <div id='status'>{onlineStatus()}</div>
      <span id='bio'>Add a bio and tell users a bit more about yourself (in settings)</span>
      </>
    : null
}
  
  return (
    <>
    <div id='profile-container'>
        {renderUser()}
        <Steam userId={userId} />
    </div>
    
    </>
  )
}

export default User