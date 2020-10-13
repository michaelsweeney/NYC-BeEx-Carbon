import React, { useState, useEffect } from 'react';

const DemoModeButton = props => {
	const { isDemoMode } = props;

	const setDemo = () => {
		props.callback(!isDemoMode);
	};

	return (
		<button className={isDemoMode ? 'demo-btn demo-on' : ' demo-btn demo-off'} onClick={setDemo}>
			DEMO
		</button>
	);
};

export { DemoModeButton };
