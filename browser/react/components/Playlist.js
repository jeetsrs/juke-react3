import React, { Component } from 'react';
import Songs from './Songs';
import axios from 'axios';

export default class Playlist extends Component {
  constructor(props){
    super(props);
    this.state = {
      playlist: {}
    };
    this.loadPlaylist = this.loadPlaylist.bind(this);
  }

  loadPlaylist (playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
    .then(res => res.data)
    .then(playlist => {
      this.setState({ playlist: playlist });
    });
  }

  componentDidMount () {
        const playlistId = this.props.match.params.playlistId;
        this.loadPlaylist(playlistId);
        //On first load - get the playlistId from the URL and then load the playlist details from the DB using axios.
  }

  componentWillReceiveProps(nextProps){
    const nextPlaylistId = nextProps.match.params.playlistId;
    if (this.props != nextProps) this.loadPlaylist(nextPlaylistId);
    //On subsequent URL Changes - get the playlistId from the URL and then load the playlist details from the DB using axios.
  }

  render(){
    let playlist = this.state.playlist;
    return(
      <div>
      <h3>{ playlist.name }</h3>
      <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
      { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
      <hr />
      </div>
    );
  }
}
