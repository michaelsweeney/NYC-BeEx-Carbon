import React from 'react';

import UtilityInputContainer from './utilityinputcontainer.js';
import BuildingTypeContainer from './buildingtypecontainer.js';

const Sidebar = props => {
	return (
		<div className="sidebar">
			<div className="sidebar-main-container">
				<div className="head-text-2">Building Inputs</div>
				<BuildingTypeContainer />
				<div className="head-text-2">Utility Inputs</div>
				<UtilityInputContainer />
			</div>
		</div>
	);
};

export default Sidebar;
