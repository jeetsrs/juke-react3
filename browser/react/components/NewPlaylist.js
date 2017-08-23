import React, { Component } from 'react';
import axios from 'axios';

export default class NewPlayList extends Component {

  constructor(props){
    super(props);
    this.state = {
      inputValue: "",
      buttonVal: true,
      modified: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    event.preventDefault();
    console.log('inputValue: ', event.target.value);
    this.setState({inputValue: event.target.value, modified: true});

    (event.target.value.length >= 16 || event.target.value.length === 0) ? this.setState({buttonVal:true}) : this.setState({buttonVal:false});
  }

  handleSubmit (evt) {
    evt.preventDefault(); // prevent the page from refreshing
    this.props.addPlaylist(this.state.inputValue); // pass the input value to the method from Main!
    this.setState({inputValue: ''}); // reset the input value to be empty
  }

  render(){
    const warning = <div className="alert alert-warning">Please enter a name</div>;
    return (
      <div className="well">
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <fieldset>
          {(this.state.modified && this.state.inputValue.length === 0)
          ? warning
          : null
          }

            <legend>New Playlist</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" onChange={this.handleChange} value={this.state.inputValue}/>
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
