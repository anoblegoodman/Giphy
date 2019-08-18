import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss'
import * as giphActions from '../action/giphActions';
import * as likeActions from '../action/likeActions';

const mapStateToProps = state => {
  return {
    totalLiked: state.likesReducer.totalLiked,
    weirdness: state.giphyReducer.weirdness,
    currentGiph: state.giphyReducer.currentGiph,
    usersLikes: state.giphyReducer.usersLikes,
    error: state.giphyReducer.error,
    loading: state.giphyReducer.loading,
    searchTerm: state.giphyReducer.searchTerm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetchGiph: searchTerm =>
      dispatch(giphActions.fetchGiph(searchTerm)),
    addLike: totalLiked => dispatch(likeActions.addLike(totalLiked)),
    removeLike: totalLiked => dispatch(likeActions.removeLike(totalLiked)),
    removeAllLikes: totalLiked =>
      dispatch(likeActions.removeAllLikes(totalLiked))
  };
};

class GiphsDisconnected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleTyping = event => {
    const newSearchTerm = event.target.value;
    this.setState({ searchTerm: newSearchTerm });
  };

  handleSubmitButton = () => {
    this.props.dispatchFetchGiph(this.state.searchTerm);
  };

  render() {
    const { totalLiked, removeLike, removeAllLikes, addLike, classes } = this.props;
    const { searchTerm } = this.state;
    const { currentGiph } = this.props;

    console.log('this.props', this.props);
    console.log('this.state', this.state);
    return (
      <>
        <input
          value={searchTerm}
          onChange={this.handleTyping}
          type="text"
          placeholder="Search"
        />
        <button className={classes.submitButton} onClick={() => this.handleSubmitButton()}>
          Submit
        </button>
        <br />
        <button onClick={() => addLike(totalLiked)}>Like</button>
        <h6>{`Total Liked Is: ${totalLiked}`}</h6>
        <button onClick={() => removeLike(totalLiked)}>Unlike</button>
        <button onClick={() => removeAllLikes()}>Remove All Likes</button>
        {currentGiph.url ? <img src={this.props.currentGiph.url} alt="Reload Please: Unable to Render Giph" /> : null }
      </>
    );
  }
}

const styles = {
  submitButton: {
    margin: 5,
    padding: {
      top: 5,
      bottom: 5,
      right: 10,
      left: 10
    },
    backgroundColor: 'pink',
    color: 'black'
  },
}

const StyledGiph = injectSheet(styles)(GiphsDisconnected)

export const Giphs = connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledGiph);
