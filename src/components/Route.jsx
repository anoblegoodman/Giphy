import React, { useState } from 'react';
import { Giphs } from './Giphs'
import { Results } from './Results'


export const Router = () => {	
	const [route, setRoute] = useState('gif');

  return (
    <div>
			{route === 'gif' ?  <Giphs setRoute={setRoute}/> : 	<Results setRoute={setRoute}/> }
    </div>
  );
}
