import React, { useEffect, useState } from 'react'

function Steam({ userId }) {
    const queryParameters = new URLSearchParams(window.location.search)
    const ID = queryParameters.get("ID")
    const steamID = localStorage.getItem("steamID")
    const token = localStorage.getItem("token")
    const [ redirectHome, setRedirectHome ] = useState(false)
    const [ steamId, setSteamId ] = useState("")
    const [ profilePic, setProfilePic ] = useState("")

        //checks if there is a param
        useEffect(() => {
            if (ID !== null){
                setSteamId(ID)
                localStorage.setItem("steamID", ID)
            }
        }, [])

        // waits for profile pic and then adds it to users account
        useEffect(() => {
            if(profilePic !== "") {
                linkSteam()
            }

        }, [profilePic])

        // initiate call for adding steamid to user
        useEffect(() => {
            if(steamId !== "") {
                getProfilePic()
            }
        },[steamId])


        // retrieves users profile pic
        function getProfilePic() {
            const url = `http://localhost:4000/steamUser/${steamID}`
            fetch(url, {
                method: "GET",
                headers: new Headers({
                "Content-Type": "application/json"
                })
            })
            .then(res => res.json())
            .then(data => {
                setProfilePic(data.response.players[0].avatarfull)
                
            })
        }

        // the actual call to add steam id to user
        function linkSteam() {
            const body = {
                "steamId": steamId,
                "profilePic": profilePic
            };
                const url = `http://localhost:4000/user/update/${userId}`
                    fetch(url, {
                        method: "PUT",
                        body: JSON.stringify(body),
                        headers: new Headers({
                        "Content-Type": "application/json",
                        "authorization": token
                        })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                setTimeout(() => setRedirectHome(true), 2000 )
                })
                .catch(err => console.log(err))
            
        }

        function display() {
            return ID !== null ?
            <><p style={{color: 'white'}}>Linking Steam...</p></>
            :  steamID !== ""
            ? <><span></span></> 
            : <a id='steam-login' href="http://localhost:4000/api/auth/steam" ><img src="https://community.cloudflare.steamstatic.com/public/shared/images/signinthroughsteam/sits_landing.png" alt="Steam Login" width="50px" height="20px"/></a>
    }

    useEffect(() => {
        if(redirectHome) {
            window.location = ("http://localhost:3000/")
        }
    }, [redirectHome])


    return (
    <>
    {display()}
    </>
    )
}

export default Steam