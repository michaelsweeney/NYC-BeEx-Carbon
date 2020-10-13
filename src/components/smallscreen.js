import React from 'react';
import { BeExLogo } from './beexlogo';

const SmallScreen = props => {
	return (
		<div
			className="modal"
			style={{
				visibility: props.visible ? 'visible' : 'hidden',
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

export { SmallScreen };
