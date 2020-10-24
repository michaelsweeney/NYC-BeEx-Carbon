import React from 'react';
import { BeExLogo } from './beexlogo';
import { conn } from '../store/connect';

const SmallScreen = props => {
	const { isSmallScreen } = props;
	return (
		<div
			className="modal"
			style={{
				visibility: isSmallScreen ? 'visible' : 'hidden',
			}}
		>
			<div className="modal-content" style={{ height: '75vh', width: '75vw' }}>
				<div className="head-text-1"> NYC LL97 Carbon Calculator</div>
				<div className="head-text-2"> screen / window too small to view app.</div>
				<div className="head-text-3" style={{ marginLeft: 20 }}>
					please view on a larger device or increase window size.
				</div>
				<div style={{ marginLeft: 20, marginTop: 20 }}>
					<BeExLogo props={{ width: '150px', height: '75px' }} />
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = state => {
	return {
		isSmallScreen: state.ui.isSmallScreen,
	};
};

export default conn(mapStateToProps)(SmallScreen);
