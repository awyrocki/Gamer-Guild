import React, { useEffect, useState } from 'react'

function Steam({ userId }) {
    const queryParameters = new URLSearchParams(window.location.search)
    const ID = queryParameters.get("ID")
    const steamID = localStorage.getItem("steamID")
    const [ redirectHome, setRedirectHome ] = useState(false)
    const [ steamId, setSteamId ] = useState("")

        //checks if there is a param
        useEffect(() => {
            if (ID !== null){
                setSteamId(ID)
                localStorage.setItem("steamID", ID)
            }
        }, [])

        // initiate call for adding steamid to user
        useEffect(() => {
            if(steamId !== "") {
            console.log(steamId)
                linkSteam()
            }
        },[steamId])

        // the actual call to add steam id to user
        function linkSteam() {
            const body = {
                "steamId": steamId
            };
                const url = `http://localhost:4000/user/update/${userId}`
                    fetch(url, {
                        method: "PUT",
                        body: JSON.stringify(body),
                        headers: new Headers({
                        "Content-Type": "application/json",
                        authorization: ""
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
            <><p>Linking...</p></>
            :  steamID
            ? <><p>steam is Linked</p></> 
            : <a id='steam-login' href="http://localhost:4000/api/auth/steam" ><img src="https://community.cloudflare.steamstatic.com/public/shared/images/signinthroughsteam/sits_landing.png" alt="Steam Login" width="50px" height="20px"/></a>
    }

    useEffect(() => {
        if(redirectHome) {
            window.location.replace("http://localhost:3000/home")
        }
    }, [redirectHome])


    return (
    <>
    {display()}
    </>
    )
}

export default Steam