import React, { useState, useEffect } from 'react';

export default function Stage({ boxes, setBoxes, setRemain, remain, stage, saveLocalTodos, getLocalTodos }) {
	let [ trueBoxes, setTrueBoxes ] = useState([]);
	useEffect(() => {
		getLocalTodos('trueBoxes', setTrueBoxes);
	}, []);
	const handleCheck = (number, finish) => {
		setBoxes(
			boxes.map((box) => {
				if (box.number === number) {
					return {
						...box,
						finish: !box.finish
					};
				}

				return box;
			})
		);

		if (finish === false) {
			setRemain((remain = remain - 1));
			test();
		} else {
			setRemain((remain = remain + 1));
			test2();
		}
	};

	useEffect(
		() => {
			saveLocalTodos(trueBoxes, 'trueBoxes');
		},
		[ trueBoxes ]
	);

	const test = () => {
		boxes.forEach((box) => {
			if (box.finish === false) {
				setTrueBoxes(trueBoxes.concat(box));
			}
		});
	};

	const test2 = () => {
		boxes.forEach((box) => {
			if (box.finish === true) {
				setTrueBoxes(trueBoxes.slice(1));
			}
		});
	};

	return (
		<div className={`stage stage${stage}`}>
			<div>
				<div className="center">
					<h2>Stage {stage}</h2>
					<span className="badge">{7 - trueBoxes.length}</span>
				</div>
				<div className="boxes">
					{boxes.map((box) => (
						<div onClick={() => handleCheck(box.number, box.finish)} key={box.number} className={`box `}>
							{box.number}
							{box.finish && (
								<div className="finish">
									<i className="fas fa-check-circle fa-2x" />
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
