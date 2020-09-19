import React, { useState, useEffect } from 'react';
import Counter from './components/Counter';
import Stage from './components/Stage';
import './App.css';

function App() {
	let [ remain, setRemain ] = useState(21);
	const [ boxes, setBoxes ] = useState([
		{
			number: 1,
			finish: false,
			id: 1
		},
		{
			number: 2,
			finish: false,
			id: 2
		},
		{
			number: 3,
			finish: false,
			id: 3
		},
		{
			number: 4,
			finish: false,
			id: 4
		},
		{
			number: 5,
			finish: false,
			id: 5
		},
		{
			number: 6,
			finish: false,
			id: 6
		},
		{
			number: 7,
			finish: false,
			id: 7
		}
	]);
	const [ newBox, setNewBox ] = useState([ ...boxes ]);
	const [ newwBox, setNewwBox ] = useState([ ...boxes ]);

	useEffect(() => {
		getLocalTodos('boxes', setBoxes);
		getLocalTodos('newBox', setNewBox);
		getLocalTodos('newwBox', setNewwBox);
		getLocalTodos('remain', setRemain);
	}, []);
	useEffect(
		() => {
			saveLocalTodos(boxes, 'boxes');
			saveLocalTodos(newBox, 'newBox');
			saveLocalTodos(newwBox, 'newwBox');
			saveLocalTodos(remain, 'remain');
		},
		[ boxes, newBox, newwBox ]
	);

	const saveLocalTodos = (item, name) => {
		localStorage.setItem(name, JSON.stringify(item));
	};

	const getLocalTodos = (name, set) => {
		if (localStorage.getItem(name) === null) {
			localStorage.setItem(name, JSON.stringify([]));
		} else {
			let todoLocal = JSON.parse(localStorage.getItem(name));
			set(todoLocal);
		}
	};
	return (
		<div className="App">
			<div className="container">
				<Counter remain={remain} />
				<Stage
					saveLocalTodos={saveLocalTodos}
					getLocalTodos={getLocalTodos}
					boxNum={7}
					stage="1"
					remain={remain}
					setRemain={setRemain}
					boxes={[ ...boxes ]}
					setBoxes={setBoxes}
				/>
				<Stage
					stage="2"
					remain={remain}
					setRemain={setRemain}
					boxes={newBox}
					setBoxes={setNewBox}
					saveLocalTodos={saveLocalTodos}
					getLocalTodos={getLocalTodos}
				/>
				<Stage
					stage="3"
					remain={remain}
					setRemain={setRemain}
					boxes={newwBox}
					setBoxes={setNewwBox}
					saveLocalTodos={saveLocalTodos}
					getLocalTodos={getLocalTodos}
				/>
			</div>
		</div>
	);
}

export default App;
