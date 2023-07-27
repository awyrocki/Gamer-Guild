import React, { useState } from 'react'
import "./Nav.css"
import icon from "./gg.png"
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Badge from '@mui/material/Badge'
import { AppBar, Box, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material"
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton'

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-around",
  alignItems:"center",
  backgroundColor:"#121212"
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
    document.querySelector("body").setAttribute('data-theme', 'dark')
}
// sets the body theme to light
const setLightMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'light')
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
  const [ open, setOpen ] = useState(false)

  return (
    <>
      <AppBar position='sticky' id="nav-bar">
        <StyledToolbar>
          <Typography 
          variant='h6'
          sx={{display:{xs:"none", sm:"block"}}}
          ><VideogameAssetIcon fontSize='small'/> <a id='nav-icon' onClick={handleClick} href='http://localhost:3000/Home'>GamerGuild</a>
          </Typography>
          <Avatar
          alt='Logo'
          src={icon}
          sx={{display:{xs:"block", sm:"none"}}}
          />
          <Search><InputBase placeholder='Search'/></Search>
          <Icons>
            <a
            onClick={handleClick}
            href='http://localhost:3000/Home'
            ><HomeIcon
            id='nav-icon'
            /></a>
            <Badge badgeContent={3} color='error'>
              <a
              onClick={handleClick}
              href='http://localhost:3000/Notifications'
              ><NotificationsIcon id='nav-icon'/></a>
            </Badge>
            <IconButton id='nav-icon' onClick={handleIconClick}>
              {mode ? <LightModeIcon 
              onClick={() => {setLightDarkMode(!lightDarkMode);
                toggleTheme();}}
              /> : <DarkModeIcon 
              onClick={() => {setLightDarkMode(!lightDarkMode);
                toggleTheme();}}
              />}
            </IconButton>
            <SettingsIcon
            onClick={(e) => setOpen(true)}
            id='nav-icon'
            />
          </Icons>
        </StyledToolbar>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
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
        href='http://localhost:3000/'
        ><MenuItem>Logout</MenuItem></a>
      </Menu>
      </AppBar>
    </>
  )
}

/* <Button
                startIcon={lightDarkMode ? <LightModeIcon/> : <DarkModeIcon/>}
                onClick={() => {setLightDarkMode(!lightDarkMode);
                toggleTheme();}}
                color='warning'
                variant='outlined'
            ></Button> */

export default Nav