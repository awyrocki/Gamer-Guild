import React from 'react'
import "./Feed.css"
import GuildPage from './GuildPage'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import mod from "./mod.png"
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import PushPinIcon from '@mui/icons-material/PushPin';


function Feed({ GuildName}) { 

  function display() {
    if(GuildName) {
      return <GuildPage GuildName={GuildName}/>
    } else {
      return <>
      <Card >
      <CardHeader
        avatar={
          <Avatar src={mod} aria-label="recipe"></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* implement settings? (delete, edit posts) */}
            <PushPinIcon sx={{color:"#B3B3B3"}}/>
          </IconButton>
        }
        title="Welcome to Gamer Guild!"
        subheader="Mod Arcanine"
        subheaderTypographyProps={{color:"#B3B3B3"}}
        sx={{color:"White", bgcolor:"#121212", fontSize:""}}
      />
      <CardContent sx={{bgcolor:"#121212"}}>
        <Typography variant="body2" color="#B3B3B3" bgcolor={"#121212"}>
        We extend our warm welcome to you! For newcomers, you have the opportunity to connect your Steam account through the user profile section on the dashboard. Access settings by clicking on the cog icon above, where you can also unlink your Steam account or switch between light and dark modes. In the discover section, you can find and join various guilds, or take the initiative and create your own community using the dedicated button. Always remember to be kind and respectful, and most importantly, have a fantastic time!
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
      </>
    }
  }

  return (
    <>
    <div id='center-container'>
    <div id='feed-container'>
    {display()}
    </div>
    
    </div>
    </>
  )
}

export default Feed