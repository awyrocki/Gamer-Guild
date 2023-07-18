import React from 'react'
import "./Nav.css"
import icon from "./gg.png"
import home from "./home.svg"
import noti from "./noti.svg"
import cog from "./cog.svg"

function Nav() {
  return (
    <>
    <div id='main-container'>
    <div>
        <img id='home-icon' src={icon} alt="Logo" />
    </div>
    <input id='search-bar' type="text" placeholder='Search' />
    <nav>
        <ul>
            <li><img id='nav-icon' src={home} alt="" /><a href='http://localhost:3000/Home'>Home</a></li>
            <li><img id='nav-icon' src={noti} alt="" /><a href='http://localhost:3000/Notifications'>Notifications</a></li>
            <li><img id='nav-icon' src={cog} alt="" /><a href='http://localhost:3000/Settings'>Settings</a></li>
        </ul>
    </nav>
    </div>
    </>
  )
}

export default Nav