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

function Nav() {

  const [ open, setOpen ] = useState(false)

  return (
    <>
      <AppBar position='sticky' id="nav-bar">
        <StyledToolbar>
          <Typography 
          variant='h6'
          sx={{display:{xs:"none", sm:"block"}}}
          ><VideogameAssetIcon fontSize='small'/> GamerGuild
          {/* Can remove the video game icon here */}
          </Typography>
          <Avatar
          alt='Logo'
          src={icon}
          sx={{display:{xs:"block", sm:"none"}}}
          />
          <Search><InputBase placeholder='Search'/></Search>
          <Icons>
            <HomeIcon />
            <Badge badgeContent={3} color='error'>
              <NotificationsIcon />
            </Badge>
            <SettingsIcon
            onClick={(e) => setOpen(true)}
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
        <MenuItem>Profile</MenuItem>
        <MenuItem>My Settings</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
      </AppBar>
    </>
  )
}

export default Nav