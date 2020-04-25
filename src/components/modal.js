import React from 'react';

import { BeExLogo } from './beexlogo.js'



class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isactive: props.isactive }
        this.setListeners()
    }
    setInactive = () => {
        this.props.callback()
    }

    setListeners() {
        window.addEventListener('keydown', (e) => {
            if (e.key == 'Escape') {
                this.props.callback()
            }
        })
        window.addEventListener('click', (e) => {
            if (
                (!e.target.classList.contains('modal-content'))
                &&
                (e.target.classList.contains('modal'))
            ) {
                this.props.callback()
            }
        })
    }

    render() {
        return (
            <div className={`modal ${this.props.isactive ? 'active' : 'inactive'}`}>

                <div className='modal-content'>

                    <div className='head-text-1'> NYC LL97 Carbon Calculator
                    <button className='modal-exit-btn' onClick={this.setInactive}>x</button>
                    </div>
                    <div className='head-text-2'> This tool is currently in BETA testing. Please email carboncalc@beex.org with comments or bug reports.</div>

                    <div className='instructions-container'>
                        <div className='head-text-3'> Instructions</div>
                        <ul className='head-text-4'>
                            <li>
                                Select your building type(s) and area. Additional building types can be added via the "Add Building Type" button.
                        </li>
                            <li>
                                Enter your annual consumption for each fuel source for the entire building.
                        </li>
                            <li>
                                Enter your annual utility rate for each fuel source (total annual utility cost divided by total annual consumption).
                        </li>
                            <li>
                                If you don't know your utility rate, you can use the "USE DEFAULT RATES" button to pre-populate the form with NYC average data for typical commercial buildings.
                        </li>
                        </ul>



                    </div>

                    <div className='notes-clarifications-container'>
                        <div className='head-text-3'>Notes and Clarifications</div>
                        <ul className='head-text-4'>
                            <li>
                                This calculator is based on Building Energy Exchange's understanding and interpretation of the aged version of NYC Intro 1253c (This calculator provides an approximation of the impact of the new law and should not be relied on as actual results may vary)
                        </li>
                            <li>
                                Emission limits for 2035 – 2050 are not yet itemized for each individual occupancy group. The fine identified here is based on the average value for all covered buildings that is identified in the law, and is subject to change.
                        </li>
                            <li>
                                The bill mandates an advisory board be established, who’s purpose will be to provide advice and recommendations to the commissioner and to the mayor’s office of long term planning and sustainability. These recommendations may ultimately change the carbon limits and associated fines depicted above.
                        </li>
                            <li>
                                The law as written also outlines a number of possible adjustments to the annual building emissions limit. These adjustment may be granted if capital improvements required for compliance are not reasonably possible, do not allow for a reasonable financial return, are a result of special circumstances related to the use of the building, or apply specifically for not-for-profit hospitals and healthcare facilities. However the department is responsible for determining if the adjustments apply for each covered building.
                        </li>
                            <li>
                                The law as written also outlines a number of possible adjustments to the annual building emissions limit. These adjustment may be granted if capital improvements required for compliance are not reasonably possible, do not allow for a reasonable financial return, are a result of special circumstances related to the use of the building, or apply specifically for not-for-profit hospitals and healthcare facilities. However the department is responsible for determining if the adjustments apply for each covered building.
                        </li>
                        </ul>
                    </div>



                    <div className='modal-logos'>

                        <a className='logo-nyc' href="https://retrofitaccelerator.cityofnewyork.us/" target="_blank" rel="noopener noreferrer">
                            <img src='ACCELERATOR-WHITE.png' height='60' width='100'></img>
                        </a>
                        <a className='logo-beex' href="http://www.be-exchange.org" target="_blank" rel="noopener noreferrer">
                            <BeExLogo></BeExLogo>

                        </a>
                        <a className='logo-akf' href="http://www.akfgroup.com" target="_blank" rel="noopener noreferrer">
                            <img src='logo-akf.jpg' height='50' width='90'></img>
                        </a>
                    </div>
                </div>
            </div>

        )
    }
}



export { Modal }