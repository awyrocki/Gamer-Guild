import React from 'react'
import "./User.css"

function User() {
  return (
    <div id='profile-container'>
        <div id='placeholder'>
            Place steam image here
        </div>
        <h2 id='steam-name'>Steam name</h2>
        <span id='bio'>Hey all, my name is Austin, I like to play MMOs and MOBAs</span>
    </div>
  )
}

export default User