import React, { useEffect, useState } from 'react'
import Steam from '../Steam/Steam';
import profilePic from "./default-profile.jpg"
import "./User.css"

function User({ logout }) {
  const [ userProfile, setUserProfile ] = useState(null);
  const [ steamUser, setSteamUser ] = useState(null)
  const userId = localStorage.getItem("id")
  const steamID = localStorage.getItem("steamID")
  const userName = localStorage.getItem("userName")
  const token = localStorage.getItem("token")
  
  // if user isnt linked to steam gets their regular profile
  function fetchUser() {
      const url = `http://localhost:4000/user/${userId}`
      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "authorization": token
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.message === "You are not authorized" || data.message === "invalid signature" || data.message === "jwt malformed" || data.message === "invalid token" ) {
        logout()
    } else {
      setUserProfile(data)
    }
    })
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
  .then(data => setSteamUser(data.response.players[0]))
  }

  useEffect(() => {
        fetchUser()
      if (steamID !== ""){
        fetchSteamUser()
      }
  }, [])

function whichPic() {
  return steamUser !== null
  ? steamUser.avatarfull
  : profilePic
}
// displays online status using steam
// ! not sure how to implement this to other users
// function onlineStatus() {
//   if (steamID === "") {
//     return <p></p>
//   } else {
//     return status === 0
//     ? <><p>Offline</p><span id='status-light-off'></span></>
//     : status === 1
//     ? <><p>Online</p><span id='status-light-on'></span></>
//     : <p></p>
//   }
// }

function renderUser() {
  return !userProfile
    ? <h2>Loading User</h2>
    : userProfile
    ? <><a href={`http://localhost:3000/user?User=${userName}`} id='user-name'>{userName}</a> 
      <div id="profile-pic"><img src={whichPic()} alt="profile picture" width="75px" /> </div>
      {/* <div id='status'>{onlineStatus()}</div> */}
      <span id='bio'>{userProfile.bio}</span>
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