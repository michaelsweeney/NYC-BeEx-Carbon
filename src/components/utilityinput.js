
import React from 'react';

class UtilityInput extends React.Component {
    constructor(props) {
      super(props)
    }
  
    render() {
      let {
        title,
        cons_title,
        cost_title,
        utiltag,
        callback,
        vals
      } = this.props
  
      return (
        <div className={`${utiltag}-container utility-input-container`}>
          <div className='consumption-container'>
            <div className='sidebar-text-4'>{`${title} - ${cons_title}`}</div>
            <input
              type='number'
              datatag={utiltag + '-cons'}
              onChange={callback}
              value={vals.cons}>
            </input>
          </div>
          <div className='cost-container'>
            <div className='sidebar-text-4'>{cost_title}</div>
            <input
              type='number'
              datatag={utiltag + '-rate'}
              onChange={callback}
              value={vals.rate}></input>
          </div>
        </div>
      )
    }
  }
  
export {UtilityInput}  