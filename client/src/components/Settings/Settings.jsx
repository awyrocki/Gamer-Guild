import React, { useState } from 'react'
import { TextField, Button } from "@mui/material"
import "./Settings.css"
import UpdateBio from './Settings-Functionality/UpdateBio';
import ChangePassword from './Settings-Functionality/ChangePassword';
import UnlinkSteam from './Settings-Functionality/UnlinkSteam';
import CheckIcon from '@mui/icons-material/Check';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';



function Settings() {

    const [ checkMark, setCheckMark ] = useState(true)
    const [ passCheck, setPassCheck ] = useState(true)
    const [ disSteam, setDisSteam ] = useState(true)

    // use states for handling the submit of the password and bio updates
    const [ bio, setBio ] = useState("")
    const [ newPass, setNewPass ] = useState("")

  return (
    <>
    <div id='settings-container'>
        <div id='settings-sub-container'>
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
                onChange={e => setBio(e.target.value)}
            />
            <Button
                size='small'
                variant='contained'
                color={checkMark ? "secondary" : "success"}
                onClick={() => checkMark ? setCheckMark(!checkMark) : null}
                startIcon={checkMark ? null : <CheckIcon/>}
            >{checkMark ? "Add" : "Bio updated"}</Button>
            <UpdateBio bio={bio} checkMark={checkMark}/>
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
                onChange={e => setNewPass(e.target.value)}
                />
            <Button
                size='small'
                variant='contained'
                color={passCheck ? "primary" : "success"}
                onClick={() => passCheck ? setPassCheck(!passCheck) : null}
                startIcon={passCheck ? null : <CheckIcon/>}
            >{passCheck ? "Change password" : "Password changed" }</Button>
            <ChangePassword newPass={newPass} passCheck={passCheck}/>
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
            <UnlinkSteam disSteam={disSteam}/>
            </div>
            <hr />
        </div>
    </div>
    </>
  )
}

export default Settings