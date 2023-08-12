import React, { useState, useEffect, useRef } from 'react'
import "./Nav.css"
import icon from "./gg.png"
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Badge from '@mui/material/Badge'
import { AppBar, Box, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material"
import TextField from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton'
import SearchGuilds from './SearchGuilds';
import InputBase from '@mui/material/InputBase'

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems:"center",
  backgroundColor:"var(--body_color)"
})

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "White",
  padding:"0 10px",
  borderRadius: theme.shape.borderRadius,
  width:"30%"
}))

const Icons = styled(Box)(({ theme }) => ({
  display:"flex",
  gap:"20px",
  alignItems:"center"
}))

function Nav({ logout }) {
// userName from local storage
const userName = localStorage.getItem("userName")
  const handleClick = e => {
    console.log("Icon clicked")
  }
// sets the body theme to dark
  const setDarkMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'dark');
    localStorage.setItem("selectedTheme", "dark")
}
// sets the body theme to light
const setLightMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'light');
    localStorage.setItem("selectedTheme", "light")
}

const selectedTheme = localStorage.getItem("selectedTheme");
if(!selectedTheme || selectedTheme !== 'light') {
  setDarkMode();
} else {
  setLightMode()
}
// toggles the light/dark mode theme
const toggleTheme = () => {
    const body = document.querySelector('body')
    const currentTheme = body.getAttribute('data-theme')
    if(currentTheme === 'dark') {
        setLightMode()
    } else {
        setDarkMode()
    }
}
  
  const [ mode, setMode ] = useState(false)


  const handleIconClick = () => {
    setMode(!mode)
  }

  const [ lightDarkMode, setLightDarkMode ] = useState(true)

  // search text input
  const [ search, setSearch ] = useState("")

  // added same drop down menu behavior as message card
  const [ anchorElement, setAnchorElement ] = useState(null)
  const handleMenuClick = e => {
      setAnchorElement(e.currentTarget)
  }
  const handleCloseMenu = () => {
      setAnchorElement(null)
  }

  return (
    <>
      <AppBar position='sticky' id="nav-bar">
        <StyledToolbar>
          <Typography 
          variant='h6'
          sx={{display:{xs:"none", sm:"block"}}}
          ><VideogameAssetIcon sx={{color:"var(--text_color)"}} fontSize='small'/> <a id='nav-icon' onClick={handleClick} href='http://localhost:3000/'>GamerGuild</a>
          </Typography>
          <Avatar
          alt='Logo'
          src={icon}
          sx={{display:{xs:"block", sm:"none"}}}
          />
          <Search onChange={e => {
              e.preventDefault()
              setSearch(e.target.value)
            }} id='search-bar'>
            <InputBase placeholder='Search Guilds'/>
            <SearchGuilds search={search}/>
            </Search>
          <Icons>
            <a
            onClick={handleClick}
            href='http://localhost:3000/'
            ><HomeIcon
            id='nav-icon'
            /></a>
            <Badge badgeContent={3} color='error'>
              <a
              onClick={handleClick}
              href='http://localhost:3000/Notifications'
              ><NotificationsIcon id='nav-icon'/></a>
            </Badge>
            <IconButton sx={{ml: -1, mr: -1}} id='nav-icon' onClick={handleIconClick}>
              {mode ? <LightModeIcon 
              onClick={() => {setLightDarkMode(!lightDarkMode);
                toggleTheme();}}
              /> : <DarkModeIcon 
              onClick={() => {setLightDarkMode(!lightDarkMode);
                toggleTheme();}}
              />}
            </IconButton>
            <SettingsIcon
            onClick={handleMenuClick}
            id='nav-icon'
            />
          </Icons>
        </StyledToolbar>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <a
        id='menu-options' 
        onClick={handleClick} 
        href={`http://localhost:3000/user?User=${userName}`}
        ><MenuItem>Profile</MenuItem></a>
        <a
        id='menu-options'
        onClick={handleClick}
        href='http://localhost:3000/Settings'
        ><MenuItem>My Settings</MenuItem></a>
        <a
        id='menu-options'
        onClick={logout}
        href='http://localhost:3000/login'
        ><MenuItem>Logout</MenuItem></a>
      </Menu>
      </AppBar>
    </>
  )
}

export default Nav