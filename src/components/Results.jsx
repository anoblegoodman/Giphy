import React from 'react';
import { connect } from 'react-redux'
import injectSheet from 'react-jss';
import * as likeActions from '../action/likeActions';


const mapStateToProps = state => {
  return {
    totalLikedGifs: state.likesReducer.totalLikedGifs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeAllLikes: totalLiked =>
      dispatch(likeActions.removeAllLikes(totalLiked))
  };
};

const calculateUserWeirdness = (totalLikedGifs) => {
	const averageWeirdness = totalLikedGifs.reduce((sum, likedObj) => {
		return sum + Number(likedObj.weirdness)
	}, 0)
	return averageWeirdness / totalLikedGifs.length
}

export const ResultsDisconnected = ({ totalLikedGifs, removeAllLikes, setRoute, classes }) => {
	const averageWeirdnessScore = calculateUserWeirdness(totalLikedGifs)
	const likedComponents = totalLikedGifs.map(liked =>
		liked.url ? (
			<div>
				{liked.searchTerm ? (
					<p>{liked.searchTerm}</p>
				) : null}
				{liked.url ? (
					<img
						src={liked.url}
						alt="Reload Please: Unable to Render Giph"
						width={'50%'}
					/>
				) : null}
				{liked.url ? (
					<p>{liked.weirdness}/10</p>
				): null}
				<br />
			</div>
		) : null
		);

  return (
    <div className={classes.results}>
			<h1>{`You scored an ${Math.round(averageWeirdnessScore)} out of 10 on the weirdness scale!`}</h1>
      <h3>The GIFs you liked:</h3>
			<div className={classes.container}>{likedComponents}</div>
			<button
					onClick={() => {
						removeAllLikes()
						setRoute('gif')
					}}
				>
					Start Over
				</button>
    </div>
  );
}

const styles = {
	results: {
		textAlign: 'center'
	},
  container: {
		display: 'flex',
		flexDirection: 'horizontal'
	}
};

const StyledResults = injectSheet(styles)(ResultsDisconnected);

export const Results = connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledResults);