import React from 'react';

class Footer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="footer">
				<div className="footer-left">
					<p>
						What now? Visit{' '}
						<a
							href="https://retrofitaccelerator.cityofnewyork.us/"
							target="_blank"
							rel="noopener noreferrer"
						>
							NYC Accelerator
						</a>{' '}
						for free, personalized advisory services to improve building energy efficiency and lower carbon
						emissions.
					</p>
				</div>
				<div className="footer-right">
					<p>
						<a href="http://www.akfgroup.com" target="_blank" rel="noopener noreferrer">
							Calculator engine by AKF Group LLC
						</a>
					</p>
				</div>
			</div>
		);
	}
}
export { Footer };
