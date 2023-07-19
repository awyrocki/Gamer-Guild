import React, { useState } from 'react'
import "./Discover.css"
import Guild from '../Guild/Guild'

function Discover() {

  const [ guildName, setGuildName ] = useState("")

  return (
    <div id='discover-container'>
        <h3 id='guild-title'>Discover</h3>
        <h4 id='game-title'>RuneScape</h4>
        <span id='game-description'>Massive multiplayer MMORPG</span>
        <h4 id='game-title'>Hades</h4>
        <span id='game-description'>Rougelite adventure</span>
        <h4 id='game-title'>Fall Guys</h4>
        <span id='game-description'>Party game with friends</span>
        <h4 id='game-title'>Slay the Spire</h4>
        <span id='game-description'>Rougelite deck builder</span>
    </div>
  )
}

export default Discover