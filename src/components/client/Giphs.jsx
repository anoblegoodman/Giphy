import React from 'react';

function Giphs({ totalLiked, addLike, removeLike, removeAllLikes }) {
  return (
    <>
      <button onClick={() => addLike(totalLiked)}>Like</button>
      <h6>{`Total Liked Is: ${totalLiked}`}</h6>
      <button onClick={() => removeLike(totalLiked)}>Unlike</button>
      <button onClick={() => removeAllLikes()}>Remove All Likes</button>
    </>
  );
}

export default Giphs;
