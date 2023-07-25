import React, { useEffect, useState } from 'react'
import MessageInput from './MessageInput'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import mod from "./user.jpg"
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import MoreVert from '@mui/icons-material/MoreVert';

function GuildPage({ GuildName }) {

    

    const [messages, setMessages ] = useState([])
    // to trigger fetch
    const [ sent, setSent ] = useState("")

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
    }, [sent])

    function render() {
        return <>
        <div id='guild-container'>
        <div>
        {messages.map((message, i) => (
        <div key={i} className='message-list'>
        <Card sx={{width:"25em"}}>
            <CardHeader
            titleTypographyProps={{variant:'h7'}}
            avatar={<Avatar src={mod} ></Avatar>}
                // change the avatar to the avatar of the user?
            action={<IconButton aria-label="settings"><MoreVert sx={{color:"#B3B3B3"}}/></IconButton>}
            /* implement settings? (delete, edit posts) */
            title={message.user}
            // Could add a user nickname
            sx={{color:"White", bgcolor:"#121212", fontSize:"20px"}}
            />
            <CardContent sx={{bgcolor:"#121212"}}>
                <Typography variant="h8" color="#B3B3B3" bgcolor={"#121212"}>
                {message.body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{bgcolor:"#121212"}}>
                <IconButton aria-label="add to favorites">
                <Checkbox icon={<FavoriteBorder sx={{color:"#B3B3B3"}}/>} checkedIcon={<Favorite sx={{color: "#B3B3B3"}}/>} />
                </IconButton>
                <IconButton aria-label="share" sx={{color:"#B3B3B3"}}>
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
            </div>
        ))}
            </div>
            </div>
            </>
            
        
    }

    // renders messages
    return (
    <>
    <div id='guild-name'>{GuildName}</div>
        {render()}
        <div id='input-container'>
            <MessageInput GuildName={GuildName} setSent={setSent}/>
        </div>
    </>
    )
}

export default GuildPage