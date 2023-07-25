import React from 'react'
import "./Nav.css"
import icon from "./gg.png"
import home from "./home.svg"
import noti from "./noti.svg"
import cog from "./cog.svg"

function Nav({ logout }) {
  return (
    <>

    <div id='main-container'>
      <div id='all-nav-components'>
      <img id='home-icon' src={icon} alt="Logo" />
      <input id='search-bar' type="text" placeholder='Search' />
      <nav>
        <ul>
          <li><img id='nav-icon' src={home} alt="" /><a href='http://localhost:3000/Home'>Home</a></li>
          <li><img id='nav-icon' src={noti} alt="" /><a href='http://localhost:3000/Notifications'>Notifications</a></li>
          <li><img id='nav-icon' src={cog} alt="" /><a href='http://localhost:3000/Settings'>Settings</a></li>
          <button onClick={logout}>Logout</button>
        </ul>
      </nav>
      </div>
    </div>
    </>
  )
}

export default Nav