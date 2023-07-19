import React, { useEffect, useState } from 'react'

function Steam({ isLinked, setIsLinked, steamId, setSteamId, userId}) {
    const queryParameters = new URLSearchParams(window.location.search)

        
        // Initial check in the background that sees if user is linked 
        useEffect(() => {
            const url = `http://127.0.0.1:4000/user/${userId}`

            fetch(url, {
                method: "GET",
                headers: new Headers({
                "Content-Type": "application.json"
            })
            })
            .then(res => res.json())
            .then(data => {
                if(data.steamId !== "") {
                    setIsLinked(true);
                }
            })
            .catch(err => console.log(err))

        }, [])

        //checks if there is a param
        useEffect(() => {
            const ID = queryParameters.get("ID")
            if (ID !== null){
                setSteamId(ID)
            }
        })

        // if the user isnt linked calls the linkSteam fx to do so
        useEffect(() => {
            if(!isLinked.current) {
                linkSteam();
            }
        })

        // the actual call to add steam id to user
        function linkSteam() {
            const body = {
                "steamId": steamId
            };
            if (steamId !== "") {
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
                    if (data.message === "User updated") {
                        setTimeout(window.location.replace("http://localhost:3000/home"), 4000)
                    }
                })
                .catch(err => console.log(err))
            }
        }

        function display() {
            return !isLinked
            ? <a id='steam-login' href="http://localhost:4000/api/auth/steam" ><img src="https://community.cloudflare.steamstatic.com/public/shared/images/signinthroughsteam/sits_landing.png" alt="Steam Login" width="50px" height="20px"/></a>
            : <p>Steam is linked</p>
    }


    return (
    <>
    {display()}
    </>
    )
}

export default Steam