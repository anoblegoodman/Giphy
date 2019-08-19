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
    this.likeRef.current.setAttribute("disabled", true);
    const { currentGiph, addLike } = this.props;
    addLike({
      gifUrl: currentGiph.url,
      gifWeirdness: currentGiph.weirdness,
      gifSearchTerm: this.state.searchTerm
    });
  };

  gatherLikedGifs = () => {
    const { classes, totalLikedGifs } = this.props || {};
    if (this.props.totalLikedGifs.length === 0) {
      return null;
    }
    const likedComponents = totalLikedGifs.map(liked =>
      liked.url ? (
        <div className={classes.resultGiph}>
          {liked.searchTerm ? (
            <p className={classes.info}>{liked.searchTerm}</p>
          ) : null}
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
        </div>
      ) : null
    );
    return likedComponents;
  };

  render() {
    const {
      totalLikedGifs,
      classes,
      currentGiph
    } = this.props;
    
    const { searchTerm } = this.state;

      if(totalLikedGifs.length === 5) {
        this.likeRef.current.setAttribute("disabled", true);
      }
    
    return (
      <>
        <div className={classes.page}>
          <div className={classes.leftSide}>
            <div>
              <p>
                Find out how weird you are by selecting the GIFS that make you
                laugh. We'll show you the least weird ones to start, but you can
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
            <div>
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
                        {totalLikedGifs.length === 5 ? 'The Liked Limit Has Been Reached' : 'Like'}
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
          <div className={classes.rightSide}>{this.gatherLikedGifs()}
          <div className={classes.calculate}>
            <button onClick={() => this.props.setRoute('results')}>
              CALCULATE MY WEIRDNESS SCORE
            </button>
            <p>{`You must Like ${5 -
              totalLikedGifs.length} more GIFs to calculate your score`}</p>
          </div>
          </div>
        </div>
      </>
    );
  }
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  calculate: {
    flex: '1',
    boxSizing: 'border-box',
    textAlign: 'center',
    marginTop: 40,
  },
  leftSide: {
    width: '50%'
  },
  rightSide: {
    width: '45%',
    display: 'flex',
    flexWrap: 'wrap',
    height: 700
  },
  resultGiph: {
    height: 100,
    flex: '0 50%',
    boxSizing: 'border-box',
    textAlign: 'center'
  },
  info: {
    textAlign: 'center'
  },
  img: {
    marginBottom: 15
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
