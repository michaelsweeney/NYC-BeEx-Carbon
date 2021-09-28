import React from 'react';

const LoadBldgButton = props => {
	const { isLoadMode } = props;

	const handleClick = () => {
		props.loadBldgCallback();
	};

	return (
		<button className={isLoadMode ? 'load-bldg-btn demo-on' : ' load-bldg-btn demo-off'} onClick={handleClick}>
			{/* <button className="load-bldg-btn demo-off" onClick={handleClick}> */}
			FIND BUILDING
		</button>
	);
};

export { LoadBldgButton };
