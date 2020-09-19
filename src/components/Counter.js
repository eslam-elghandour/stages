import React from 'react';

function Counter({ remain }) {
	return (
		<div className="title">
			<h1>Days left: {remain}</h1>
		</div>
	);
}

export default Counter;
