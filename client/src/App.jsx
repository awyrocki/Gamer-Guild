import './App.css';
import Nav from './components/Nav/Nav';
import User from './components/User/User';
import Guildlist from './components/Guildlist/Guildlist';
import Feed from './components/Feed/Feed';
import Discover from './components/Discover/Discover';
import Footer from './components/Footer/Footer';

function App() {
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
  );
}

export default App;
