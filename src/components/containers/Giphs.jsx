import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import * as giphActions from '../action/giphActions';
import * as likeActions from '../action/likeActions';

const mapStateToProps = state => {
  return {
    totalLikedGifs: state.likesReducer.totalLikedGifs,
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
    dispatchFetchGiph: (searchTerm, weirdness) =>
      dispatch(giphActions.fetchGiph(searchTerm, weirdness)),
    addLike: totalLiked => dispatch(likeActions.addLike(totalLiked)),
    removeLike: totalLiked => dispatch(likeActions.removeLike(totalLiked)),
    removeAllLikes: totalLiked =>
      dispatch(likeActions.removeAllLikes(totalLiked))
  };
};

class GiphsDisconnected extends Component {
  constructor(props) {
    super(props);
    this.likeRef = React.createRef();
    this.focusLikeBtn = this.focusLikeBtn.bind(this);
    this.state = {
      searchTerm: '',
      sliderValue: 0
    };
  }

  focusLikeBtn() {
    this.likeRef.current.focus();
  }

  handleTyping = event => {
    const newSearchTerm = event.target.value;
    this.setState({ searchTerm: newSearchTerm });
  };

  handleSubmitButton = () => {
    if (this.likeRef.current) {
      this.likeRef.current.removeAttribute('disabled');
    }
    this.props.dispatchFetchGiph(this.state.searchTerm, this.state.sliderValue);
  };

  handleSliderChange = event => {
    this.setState({ sliderValue: event.target.value });
  };

  handleLikeClick = () => {
    const { currentGiph, addLike } = this.props;
    //this.likeRef.current.setAttribute("disabled", true);
    addLike({
      gifUrl: currentGiph.url,
      gifWeirdness: currentGiph.weirdness,
      gifSearchTerm: this.state.searchTerm
    });
  };

  gatherLikedGifs = () => {
    const classes = this.props || {};
    if (this.props.totalLikedGifs.length === 0) {
      return null;
    }
    const likedComponents = this.props.totalLikedGifs.map(liked =>
      liked.url ? (
        <div className={classes.resultGiph}>
          {liked.searchTerm ? <p>{liked.searchTerm}</p> : null}
          {liked.url ? (
            <img
              className={classes.img}
              src={liked.url}
              alt="Reload Please: Unable to Render Giph"
              width={'50%'}
            />
          ) : null}
          <br />
          {liked.url ? (
            <button
              onClick={() =>
                this.props.removeLike({
                  gifUrl: liked.url,
                  gifWeirdness: liked.weirdness,
                  gifSearchTerm: this.state.searchTerm
                })
              }
            >
              Unlike
            </button>
          ) : null}
          <br />
          <p>{`Weirdness Score: ${liked.weirdness}`}</p>
        </div>
      ) : null
    );
    return likedComponents;
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

    return (
      <>
        <div className={classes.page}>
          <div>
            <div className={classes.text}>
              <p>
                Find out how weird you are by selecting the GIFS that make you
                laugh. We'll show you the least wierd ones to start, but you can
                move the slider to make them weirder.
              </p>
              <p>
                When you find a GIF you like, press the <i>Like</i> button. Once
                you like 5 GIFs, we'll show you how weird you are.
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
                onClick={() => {
                  if (this.likeRef.current) {
                    this.focusLikeBtn();
                  }
                  this.handleSubmitButton();
                }}
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
                        src={currentGiph.url}
                        alt="Reload Please: Unable to Render Giph"
                      />
                    ) : null}
                    <br />
                    {currentGiph.url ? (
                      <button
                        ref={this.likeRef}
                        onClick={() => this.handleLikeClick()}
                      >
                        Like
                      </button>
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
          </div>
          <div className={classes.liked}>{this.gatherLikedGifs()}</div>
        </div>
      </>
    );
  }
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'row'
  },
  liked: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '60%',
    height: '100%'
  },
  img: {
    marginBottom: 15
  },
  text: {
    display: 'flex',
    flexDirection: 'column'
  },
  textInput: {
    height: 25,
    width: '25%',
    padding: 5,
    fontSize: 14,
    marginBottom: 25
  },
  form: {
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
    width: '75%'
  },
  resultContainer: {
    boxShadow: '10px 10px 5px -8px rgba(0,0,0,0.75)'
  },
  giph: {
    display: 'block',
    textAlign: 'center',
    padding: 25
  },
  resultGiph: {
    maxWidth: '50%',
    display: 'block',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '40%',
    height: '100%'
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
