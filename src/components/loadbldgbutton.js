import React from 'react';

const LoadBldgButton = props => {
	const { isLoadMode } = props;

	const handleClick = () => {
		props.loadBldgCallback();
	};

	return (
		<button className={isLoadMode ? 'load-bldg-btn demo-on' : ' load-bldg-btn demo-off'} onClick={handleClick}>
			LOAD
		</button>
	);
};

export { LoadBldgButton };
