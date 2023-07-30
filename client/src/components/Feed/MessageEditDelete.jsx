import React, { useEffect } from 'react'

function MessageEditDelete({ GuildName, delMessage, editMessage, messageId, newMessage }) {
    function editMessages() {
            console.log("here")
            const url = `http://localhost:4000/message/update/${messageId}`
            const body = {
                body: newMessage
            }
            fetch(url, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: new Headers({
                "Content-Type": "application/json"
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.message === "Message updated") {
                    setTimeout(() => window.location = `http://localhost:3000/?GuildName=${GuildName}`, 500)
                }
            })
        
    }

useEffect(() => {
if (editMessage === true) {
    editMessages()
    }
}, [editMessage])

    return (
    <></>
    )
}

export default MessageEditDelete