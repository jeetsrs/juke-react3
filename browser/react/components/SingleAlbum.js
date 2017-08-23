import React, { Component } from 'react';
import axios from 'axios';
import Songs from '../components/Songs';

export default class SingleAlbum extends Component {

  constructor () {
    super();
    this.state = {
      album: {}
    };
    this.loadAlbum = this.loadAlbum.bind(this);
  }

  // componentDidMount () {
  //   const albumId = this.props.match.params.albumId;

  //   axios.get(`/api/albums/${albumId}`)
  //     .then(res => res.data)
  //     .then(album => this.setState({
  //       album
  //     }));
  // }

  loadAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
    .then(res => res.data)
    .then(album => this.setState({
      album
    }));
  }

  componentDidMount () {
        const albumId = this.props.match.params.albumId;
        this.loadAlbum(albumId);
        //On first load - get the playlistId from the URL and then load the playlist details from the DB using axios.
  }

  componentWillReceiveProps(nextProps){
    const nextAlbumId = nextProps.match.params.albumId;
    if (this.props != nextProps) this.loadAlbum(nextAlbumId);
  }

  render () {
    const album = this.state.album;

    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
