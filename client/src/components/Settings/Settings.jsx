import React, { useState } from 'react'
import { TextField, Button } from "@mui/material"
import "./Settings.css"
import CheckIcon from '@mui/icons-material/Check';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';



function Settings() {

    const [ checkMark, setCheckMark ] = useState(true)
    const [ lightDarkMode, setLightDarkMode ] = useState(true)
    const [ passCheck, setPassCheck ] = useState(true)
    const [ disSteam, setDisSteam ] = useState(true)

    // use states for handling the submit of the password and bio updates
    const [ bio, setBio ] = useState("")
    const [ newPass, setNewPass ] = useState("")

    // handle submit function for buttons - https://www.youtube.com/watch?v=sTdt2cJS2dg
    const handleSubmit = e => {
        e.preventDefault()


    }

  return (
    <>
    <hr />
    <div id='add-bio'>
    <span id='bio-span'>Tell us about yourself: </span>
    <TextField
        id="bio-textarea"
        placeholder="Add bio"
        multiline
        variant="filled"
        size='small'
        color='secondary'
    />
    <Button
        size='small'
        variant='contained'
        color={checkMark ? "secondary" : "success"}
        onClick={() => checkMark ? setCheckMark(!checkMark) : null}
        startIcon={checkMark ? null : <CheckIcon/>}
    >{checkMark ? "Add" : "Bio updated"}</Button>
    </div>
    <hr id='divider'/>
    <div id='light-dark-mode'>
    <span id='bio-span'>Light/Dark mode</span>
    <Button
        startIcon={lightDarkMode ? <LightModeIcon/> : <DarkModeIcon/>}
        onClick={() => setLightDarkMode(!lightDarkMode)}
        color='warning'
        variant='outlined'
    ></Button>
    </div>
    <hr id='divider'/>
    <div id='change-password'>
    <span id='bio-span'>Change password</span>
    <TextField
        id="password-input"
        type="password"
        autoComplete="current-password"
        variant="standard"
        required
        />
    <Button
        size='small'
        variant='contained'
        color={passCheck ? "primary" : "success"}
        onClick={() => passCheck ? setPassCheck(!passCheck) : null}
        startIcon={passCheck ? null : <CheckIcon/>}
    >{passCheck ? "Change password" : "Password changed" }</Button>
    </div>
    <hr id='divider'/>
    <div id='disconnect-steam'>
    <span id='bio-span'>Disconnect Steam account</span>
    <Button
        size="small"
        variant='contained'
        color={disSteam ? "error" : "success"}
        onClick={() => disSteam ? setDisSteam(!disSteam) : null}
        startIcon={disSteam ? <DisabledByDefaultIcon/> : <CheckIcon/>}
    >{disSteam? "Disconnect steam" : "Steam Disconnected"}</Button>
    </div>
    <hr />
    </>
  )
}

export default Settings