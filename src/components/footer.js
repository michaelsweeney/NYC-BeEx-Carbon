
import React from 'react';

import { BeExLogo } from './beexlogo.js';
import { HelpOutline } from '@material-ui/icons';

class Footer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="footer">
				<HelpOutline
						onClick={this.props.modalcallback}
						className="help-btn"
						style={{ color: 'rgb(184,215,52)', width: '25px', height: '25px', marginLeft: '10px' }}
					></HelpOutline>
					</div>
		);
	
}
}
export { Footer };
