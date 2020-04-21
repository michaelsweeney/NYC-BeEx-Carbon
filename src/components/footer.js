import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div className='footer'>

        <div className='footer-copy'>
        <div className='head'> A NYC Accelerator Production</div>
        <div className='mid'>Powered by Building Energy Exchange and AKF Group</div>
        </div>

        <div className='logos'>
          <img src='logo-akf.jpg' height='60' width='100'></img>
          <img src='ACCELERATOR-WHITE.png' height='60' width='100'></img>
          <img src='beex.png' height='60' width='100'></img>
        </div>

      </div>
    )
  }
}


export { Footer }