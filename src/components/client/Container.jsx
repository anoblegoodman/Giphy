import React, { Component } from 'react';
import Giphs from './Giphs.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../action/actions';
import { API_KEY } from '../config/index.js';
const axios = require('axios');

const mapStateToProps = store => {
  return {
    totalLiked: store.giphyReducer.totalLiked
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addLike: actions.addLike,
      removeLike: actions.removeLike,
      removeAllLikes: actions.removeAllLikes
    },
    dispatch
  );
};

class ContainerDisconnected extends Component {
  getGifs() {
    axios
      //replace weirdness with the value of the weirdness rating that you pull off state from the giphy reducer
      .get(
        `http://api.giphy.com/v1/gifs/translate?s=animal&weirdness=10&api_key=${API_KEY}`
      )
      .then(response => {
        JSON.stringify(response);
        console.log('response is: ', response);
      });
  }

  componentDidMount() {
    console.log('exampleContainer did mount');
    //this.getGifs()
  }

  render() {
    console.log('this.props', this.props);
    return (
      <div>
        <h1 className="container">Container</h1>
        <Giphs
          totalLiked={this.props.totalLiked}
          addLike={this.props.addLike}
          removeLike={this.props.removeLike}
          removeAllLikes={this.props.removeAllLikes}
        />
      </div>
    );
  }
}

export const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerDisconnected);
