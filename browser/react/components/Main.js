import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist';
import axios from 'axios';
import Playlist from './Playlist';

export default class Main extends Component {
  constructor () {
    super();
    this.state = {
      playlists: [],
    };

    this.addPlaylist = this.addPlaylist.bind(this);
  }

  componentDidMount(){
    axios.get('/api/playlists')
    .then(res => res.data)
    .then(playlists => {
      this.setState({playlists});
      console.log('This is in Main: ',playlists);
    }); //this puts the fetched playlist into the this.playlist\

  }

  addPlaylist (playlistName) {
    axios.post('/api/playlists/', { name: playlistName })
    .then(res => res.data)
    .then(playlist => {
      this.setState({playlists: [...this.state.playlists, playlist]});
      //This spread operator is used to concat the exisiting playlist array with the ONE new entry called playlist or playlistName
    });
  }

  render () {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists={this.state.playlists} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route path="/playlists/:playlistId" component={Playlist} />
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              {/*              <Route path="/new-playlist" component={NewPlaylist} /> */}
              <Route path="/new-playlist" render={() => <NewPlaylist addPlaylist={this.addPlaylist}/>} />
              {/*When inside a route - the only way to pass props to the Component is via a embedded render call like above */}
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
