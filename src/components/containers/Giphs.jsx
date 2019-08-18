import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
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
      sliderValue: 0
    };
  }

  handleTyping = event => {
    const newSearchTerm = event.target.value;
    this.setState({ searchTerm: newSearchTerm });
  };

  handleSubmitButton = () => {
    this.props.dispatchFetchGiph(this.state.searchTerm);
  };

  handleSliderChange = event => {
    this.setState({ sliderValue: event.target.value });
  };

  render() {
    const {
      totalLiked,
      removeLike,
      removeAllLikes,
      addLike,
      classes
    } = this.props;
    const { searchTerm } = this.state;
    const { currentGiph } = this.props;

    console.log('this.props', this.props);
    console.log('this.state', this.state);
    return (
      <>
        <div className={classes.text}>
          <p>
            Find out our wierd you are by selecting the GIFS that make you
            laugh. We'll show you the least wierdest ones to start, but you can
            move the slider to make them wierder.
          </p>
          <p>
            When you find a GIF you like, press the <i>Like</i> button. Once you
            like 5 GIFs, we'll show you how wierd you are.
          </p>
        </div>
        <div className={classes.form}>
          <input
            className={classes.textInput}
            value={searchTerm}
            onChange={this.handleTyping}
            type="text"
            placeholder="Search For A GIF"
          />
          <button
            className={classes.submitButton}
            onClick={() => this.handleSubmitButton()}
          >
            Submit
          </button>
        </div>
        <div className={classes.resultSection}>
          {currentGiph.url ? (
            <div className={classes.resultContainer}>
              <h3>Your Result</h3>
              <div className={classes.giph}>
                {currentGiph.searchTerm ? (
                  <p>{currentGiph.searchTerm}</p>
                ) : null}
                {currentGiph.url ? (
                  <img
                    className={classes.img}
                    src={this.props.currentGiph.url}
                    alt="Reload Please: Unable to Render Giph"
                  />
                ) : null}
                <br />
                {currentGiph.url ? (
                  <button onClick={() => addLike(totalLiked)}>Like</button>
                ) : null}
                <br />
                <input
                  className={classes.slider}
                  onChange={this.handleSliderChange}
                  type="range"
                  min="0"
                  max="10"
                  value={this.state.sliderValue}
                  id="myRange"
                />
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

const styles = {
  img: {
    marginBottom: 15
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%'
  },
  textInput: {
    height: 25,
    width: '25%',
    padding: 5,
    fontSize: 14,
    marginBottom: 25
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
  },
  submitButton: {
    backgroundColor: 'pink',
    color: 'black',
    height: 38,
    width: '10%'
  },
  slider: {
    marginTop: 20,
    marginBottom: 10,
    width: '80%',
    height: 15
  },
  resultSection: {
    marginLeft: 5,
    marginTop: 5,
    width: '50%'
  },
  resultContainer: {
    boxShadow: '10px 10px 5px -8px rgba(0,0,0,0.75)'
  },
  giph: {
    display: 'block',
    textAlign: 'center',
    padding: 25
  }
};

const StyledGiph = injectSheet(styles)(GiphsDisconnected);

export const Giphs = connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledGiph);

//this is the unlike and remove all likes functionality for right side of page
// <button onClick={() => removeLike(totalLiked)}>Unlike</button>
// <button onClick={() => removeAllLikes()}>Remove All Likes</button>
