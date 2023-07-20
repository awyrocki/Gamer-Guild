import React, { useEffect, useState } from 'react'

function GuildPage({ GuildName }) {

    const [messages, setMessages ] = useState([])

    function fetchMessages() {
        const url = `http://localhost:4000/message/guild/${GuildName}`
        
    fetch(url, {
            method: "GET",
            headers: new Headers({
            "Content-Type": "application/json",
            authorization: ""
            })
        })
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.log(err))
    }


useEffect(() => {
    fetchMessages()
    },[])

    function render() {
        if (messages.length === 0) {
            return <h2 id='guild-name'>{GuildName}</h2>
        } else {
            return <>
            <h2 id='guild-name'>{GuildName}</h2>
            {messages.map((message, i) => (
            <div key={i} className='message-list'>
            <h3 id="user">{message.user}</h3>
            <p>{message.body}</p>
            </div>
        ))}
            </>
        }
    }

    // renders messages
    return (
    <>
    <div id='Guild-container'>
        {render()}
        
    </div>
    </>
    )
}

export default GuildPage