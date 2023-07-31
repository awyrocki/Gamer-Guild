import React, { useEffect, useState } from 'react'
import MessageInput from './MessageInput'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import mod from "./user.jpg"
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import MoreVert from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';


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

    const [ anchorElement, setAnchorElement ] = useState(null)
    const handleMenuClick = e => {
        setAnchorElement(e.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchorElement(null)
    }

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
            action={<IconButton 
            aria-label="settings"
            onClick={handleMenuClick}
            aria-haspopup="true"
            aria-controls='demo-positioned-menu'
            ><MoreVert id='morevert' sx={{color:"var(--subtext_color)"}}/>
            </IconButton>}
            title={message.user}
            // Could add a user nickname
            sx={{color:"var(--text_color)", bgcolor:"var(--body_color)", fontSize:"20px"}}
            />
            <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleCloseMenu}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }}
        >
            {/* functionality for the menu items goes here */}
        <MenuItem>
            <ListItemIcon>
                <PushPinIcon fontSize='small' sx={{color:"black"}}/>
            </ListItemIcon>
            Pin
        </MenuItem>
        <MenuItem>
            <ListItemIcon>
                <EditIcon fontSize='small' sx={{color:"black"}}/>
            </ListItemIcon>
            Edit
        </MenuItem>
        <MenuItem>
            <ListItemIcon>
                <DeleteIcon fontSize='small' sx={{color:"black"}}/>
            </ListItemIcon>
            Delete
        </MenuItem>
        </Menu>
            <CardContent sx={{bgcolor:"var(--body_color)"}}>
                <Typography sx={{wordBreak:"break-word"}} variant="h8" color="var(--text_color)" bgcolor={"var(--body_color)"}>
                {message.body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{bgcolor:"var(--body_color)"}}>
                <IconButton aria-label="add to favorites">
                <Checkbox icon={<FavoriteBorder sx={{color:"var(--subtext_color)"}}/>} checkedIcon={<Favorite sx={{color: "var(--subtext_color)"}}/>} />
                </IconButton>
                <IconButton aria-label="share" sx={{color:"var(--subtext_color)"}}>
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