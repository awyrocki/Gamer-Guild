import React, { useState, useRef } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import GifIcon from '@mui/icons-material/Gif';
import Button from '@mui/material/Button';

function MessageInput({ GuildName, setSent }) {
    const textFieldRef = useRef()
    
    function createMessage() {
        
        const user = localStorage.getItem("userName")
        const message = textFieldRef.current.value
        const url = "http://127.0.0.1:4000/message/create"
        const send = {
            user: user,
            guild: GuildName,
            body: message
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(send),
            headers: new Headers({
                "Content-Type": "application/json"
                // ! session token
            })
        })
        .then(res => res.json())
        .then(data => setSent(data)) //triggers useState to render messages
        .catch(err => console.log(err))
    }
    return (
    <>
        <div id='input-container'>
        <form action="" id='message-form'>
        <Box sx={{width:"100%"}}>
            <TextField
                inputProps={{ ref: textFieldRef }}
                id="standard-multiline-flexible"
                multiline
                sx={{bgcolor:"#B3B3B3", borderRadius:"5px", width:"100%"}}
                color='primary'
                maxRows={4}
                placeholder='Create new post'
                variant="standard"
                />
            <Stack direction="row" gap={1} mt={1} mb={1}>
                <AddCircleIcon sx={{color:"white"}}/>
                <EmojiEmotionsIcon sx={{color:"white"}}/>
                <AddPhotoAlternateIcon sx={{color:"white"}}/>
                <GifIcon sx={{color:"white"}}/>
                <Button
                id='send' 
                onClick={e => {
                e.preventDefault()
                createMessage()
                textFieldRef.current.value=''
                }}
                >Post</Button>
            </Stack>
        </Box>
    </form>
    </div>
    </>
    )
}

export default MessageInput