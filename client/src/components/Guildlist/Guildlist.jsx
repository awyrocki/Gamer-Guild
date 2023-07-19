import React from 'react'
import "./Guildlist.css"

function Guildlist() {
  return (
    <div id='guildlist-container'>
      <h3 id='guild-title'>Guilds</h3>
      <h4 id='game-title'>Among Us</h4>
      <span id='game-description'>A fun party game with friends</span>
      <h4 id='game-title'>League of Legends</h4>
      <span id='game-description'>Competitive MOBA</span>
      <h4 id='game-title'>CS:GO</h4>
      <span id='game-description'>Competitive FPS</span>
      <h4 id='game-title'>Stardew Valley</h4>
      <span id='game-description'>Cute farming sim</span>
    </div>
  )
}

export default Guildlist