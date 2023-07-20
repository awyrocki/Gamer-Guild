import React, { useState, useEffect } from 'react'
import Nav from '../Nav/Nav';
import User from '../User/User';
import Guildlist from '../Guildlist/Guildlist';
import Feed from '../Feed/Feed';
import Discover from '../Discover/Discover';
import Footer from '../Footer/Footer';
import AddDelete from '../Discover/AddDelete/AddDelete';

function Dashboard() {

  const [ guildName, setGuildName ] = useState("")

  return (
    <>
      <Nav />
      <div id='container'>
        <div id='left-columns'>
          <User />
          <Guildlist setGuildName={setGuildName}/>
        </div>
        <Feed />
        <div id='discover-create'>
          <Discover setGuildName={setGuildName}/>
          <AddDelete setGuildName={setGuildName}/>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard