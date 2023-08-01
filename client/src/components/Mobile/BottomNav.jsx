import React from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

function BottomNav() {

    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ width: 'auto' }}>
            <BottomNavigation
            showLabels
            position
            sx={{bgcolor:'var(--body_color)'}}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            >
            <BottomNavigationAction 
            label="Guilds" 
            onClick={() => {

            }}
            sx={{color:'var(--text_color)'}}
            icon={<VideogameAssetIcon sx={{color:'var(--text_color)'}}/>} 
            />
            <BottomNavigationAction 
            label="Feed" 
            sx={{color:'var(--text_color)'}}
            icon={<ChatBubbleIcon sx={{color:'var(--text_color)'}}/>} 
            />
            <BottomNavigationAction 
            label="Discover" 
            sx={{color:'var(--text_color)'}}
            icon={<TravelExploreIcon sx={{color:'var(--text_color)'}}/>} 
            />
            </BottomNavigation>
        </Box>
        );
    }

export default BottomNav