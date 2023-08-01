import React, { useEffect } from 'react'

function Pin({ pinMessage, messageId, setSent, sent }) {

    function pinNewMessage() {
        const url = `http://localhost:4000/message/update/${messageId}`
        
        const body = {
            pinned: true
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
            console.log(data.message)
            setSent(!sent)
        })
    }

    useEffect(() => {
        if (pinMessage === true) {
            pinNewMessage()
        }
    }, [pinMessage])
    return (
    <>
    </>
    )
}

export default Pin