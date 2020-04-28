import React from 'react'


const NotesAndClarifications = () => {
    return (
        <React.Fragment>
            <ul className='head-text-4'>
                <li>
                    This calculator is based on interpretation of
                    NYC Local Law 97 – 2019 and provides only an
                    approximation of the impact of the carbon emissions
                    limits.  As actual results will vary the tool should
                    not be relied on as specific legal or risk mitigation
                    guidance.
        </li>
                <li>
                    Emission limits for the years 2035 thru 2050 are not
                    yet determined for each individual occupancy group.
                    The tool estimates a penalty for those years based on
                    the average value for all covered buildings identified
                    in the law.
                </li>
                <li>
                    City agency rulemaking and enforcement practices may
                    significantly impact the application of LL 97 to
                    individual buildings.
                </li>


                <li>
                    LL 97 provides a number of possible adjustments to the
                    annual building emissions limit, including appeal based o
                    n special circumstances and critical building uses.
                    These are not accounted for in the calculator.
                     </li>

            </ul>

        </React.Fragment>



    )
}

export { NotesAndClarifications }