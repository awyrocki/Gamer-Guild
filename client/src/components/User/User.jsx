import React, { useEffect, useState } from 'react'
import Steam from '../Steam/Steam';
import "./User.css"

function User() {
  const [ isLinked, setIsLinked ] = useState(false)
  const [ userProfile, setUserProfile ] = useState(null);
  const [ steamId, setSteamId ] = useState("");
  const [ render, setRender ] = useState(true)
  const userId = localStorage.getItem("id")

  function fetchUser() {
      const url = `http://127.0.0.1:4000/user/${userId}`

      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application.json"
      })
    })
    .then(res => res.json())
    .then(data => setUserProfile(data))
    // .catch(err = console.log(err))
  }

  function fetchSteamUser() {
    const url = `http://127.0.0.1:4000/user/${steamId}`
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application.json"
    })
  })
  .then(res => res.json())
  .then(data => setUserProfile(data))
  // .catch(err = console.log(err))
      
  }

  useEffect(() => {
    if(render) { 
      if(!isLinked){
      fetchUser()
      } else {
      fetchSteamUser()
      }
  }
  }, [])


  
  return (
    <>
    {console.log(userProfile)}
    <div id='profile-container'>
        <div id='placeholder'>
            Place steam image here
        </div>
        <h2 id='steam-name'>Steam name</h2>
        <span id='bio'>Hey all, my name is Austin, I like to play MMOs and MOBAs</span>
        <Steam isLinked={isLinked} setIsLinked={setIsLinked} userId={userId} steamId={steamId} setSteamId={setSteamId}/>
    </div>
    
    </>
  )
}

export default User