import React, { useEffect, useState } from 'react'
import profilePic from "./default-profile.jpg"
import "./UserProfile.css"
import Footer from "../Footer/Footer"

function UserProfile() {
    // to grab username from params
    const queryParameters = new URLSearchParams(window.location.search)
    const userName = queryParameters.get("User")
    const [ profileID, setProfileID ] = useState("")
    const [ joinedGuilds, setJoinedGuilds ] = useState([])
    const [ steamUser, setSteamUser ] = useState(null)
    const token = localStorage.getItem("token")
    const [ steamID, setSteamID ] = useState("")

    // holds user data
    const [ user, setUser ] = useState("")
    // retrieves the user by userName
    function fetchUser() {
        const url = `http://localhost:4000/user/userName/${userName}`
        
    fetch(url, {
            method: "GET",
            headers: new Headers({
            "Content-Type": "application/json",
            "authorization": token
            })
        })
        .then(res => res.json())
        .then(data => {
            setUser(data)
            setSteamID(data.steamID)
            setProfileID(data.id)
        })
        .catch(err => console.log(err))
    }

    // fetches joined guilds
    const fetchGuild = () => {
        const url = "http://127.0.0.1:4000/guild/"
    
        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
                // Render all guilds regardless of authorization
            })
        })
        .then(res => res.json())
        .then(data => {
            // filters already joined guilds
            let joined = data.filter(guild => guild.addedUsers.includes(profileID))
            setJoinedGuilds(joined)
        })
        .catch(err => console.log(err))
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

    // calls fetch on user profile 
useEffect(() => {
    fetchUser()
    if(steamID !== "") {
        fetchSteamUser()
    }
    }, [steamID])

    // fetches list of guilds
    useEffect(() => {
        if (joinedGuilds !== "") {
            fetchGuild()
        }
    }, [profileID])

    // renders online status
    function onlineStatus() {
        if (!steamUser) {
            return <p></p>
        } else {
            return steamUser.personastate === 0
            ? <><p>Offline</p><span id='status-light-off'></span></>
            : steamUser.personastate === 1
            ? <><p>Online</p><span id='status-light-on'></span></>
            : <p></p>
        }
    }

    function steamName() {
        if (!steamUser) {
            return <p></p>
        } else {
            return <>
            <p> &emsp;({steamUser.personaname})</p>
            </>
        }
    }

    return (
        <>
        <div id='outer-profile'>
            <div id='inner-profile'>
                <div id='profile-name-container'>
                    <p id='profile-name'>{user.userName}</p>
                    {steamName()}
                </div>
                <div id='pic-bio'>
                <img id='user-pic' src={user.profilePic} alt="profile pic" />
                <div id='status'>{onlineStatus()}</div>
                <p id='user-bio'> &emsp; {user.bio}</p>
                </div>
                <h2 id='profile-guild-title'>Joined Guilds</h2>
                <div id='profile-guilds'>
                    {joinedGuilds.map((guild, i) => (
                    <div key={i} id='single-guild'>
                        <h3 id={guild._id} >{guild.name}</h3><p id='profile-guild-description'>{guild.description}</p>
                        <hr id='guild-linebreak' />
                    </div>
                ))}
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default UserProfile