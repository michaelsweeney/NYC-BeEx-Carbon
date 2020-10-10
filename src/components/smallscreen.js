import React from 'react';
import { BeExLogo } from './beexlogo';
class SmallScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="head-text-1"> NYC LL97 Carbon Calculator</div>
				<div className="head-text-2"> screen / window is too small to view this app.</div>
				<div className="head-text-3" style={{ marginLeft: 20 }}>
					please view on a larger device or increase window size.
				</div>
				<div style={{ marginLeft: 20, marginTop: 20 }}>
					<BeExLogo props={{ width: '150px', height: '75px' }} />
				</div>
			</div>
		);
	}
}

export { SmallScreen };
