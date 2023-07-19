import React from 'react'
import Nav from '../Nav/Nav';
import User from '../User/User';
import Guildlist from '../Guildlist/Guildlist';
import Feed from '../Feed/Feed';
import Discover from '../Discover/Discover';
import Footer from '../Footer/Footer';

function Dashboard() {
  return (
    <>
      <Nav />
      <div id='container'>
        <div id='left-columns'>
          <User />
          <Guildlist />
        </div>
        <Feed />
        <Discover />
      </div>
      <Footer />
    </>
  )
}

export default Dashboard