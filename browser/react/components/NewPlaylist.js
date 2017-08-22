import React, { Component } from 'react';
import axios from 'axios';

export default class NewPlayList extends Component {

  constructor(props){
    super(props);
    this.state = {
      input: "",
      buttonVal: true,
      modified: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    event.preventDefault();
    console.log('input: ', event.target.value);
    this.setState({input: event.target.value, modified: true});

    (event.target.value.length >= 16 || event.target.value.length === 0) ? this.setState({buttonVal:true}) : this.setState({buttonVal:false});
  }

  handleSubmit (event) {
    event.preventDefault(); //**** THIS IS VERY IMPORTANT in FORMS to capture the submit post react refreshes ****
    console.log("*********On Submit: ", this.state.input);

    axios.post('/api/playlists/', { name: this.state.input })
    .then(res => res.data)
    .then(result => {
      console.log(result); // response json from the server!
    });
  }



  render(){
    const warning = <div className="alert alert-warning">Please enter a name</div>;
    return (
      <div className="well">
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <fieldset>
          {(this.state.modified && this.state.input.length === 0)
          ? warning
          : null
          }

            <legend>New Playlist</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" onChange={this.handleChange} value={this.state.input}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" disabled={this.state.buttonVal}>Create Playlist</button>
              </div>
            </div>

        </fieldset>
      </form>
    </div>
    );
  }
}
