import React, { useState, useEffect } from 'react'
import Nav from '../Nav/Nav';
import User from '../User/User';
import Guildlist from '../Guildlist/Guildlist';
import Feed from '../Feed/Feed';
import Discover from '../Discover/Discover';
import Footer from '../Footer/Footer';
import AddDelete from '../Discover/AddDelete/AddDelete';
import UserList from '../Discover/UserList/UserList';

function Dashboard({ logout }) {
  // grabs guild name from url params
  const queryParameters = new URLSearchParams(window.location.search)
  const GuildName = queryParameters.get("GuildName")

  // adds/ removes user list
  function renderUsers() {
    if(!GuildName) {
        return <></>
    } else {
        return <UserList GuildName={GuildName}/>
    }
  }
  return (
    <>
      <div id='container'>
        <div id='left-columns'>
          <User logout={logout}/>
          <Guildlist />
        </div>
        <Feed GuildName={GuildName}/>
        <div id='discover-create'>
          {renderUsers()}
          <Discover />
          <AddDelete />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard