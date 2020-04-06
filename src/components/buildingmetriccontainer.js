import React from 'react'


class BuildingMetricContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        let { utilities } = this.props.building

        return (
            <React.Fragment>
                <div className='container-header'>Building Metrics</div>

            </React.Fragment>
        )

    }

}


export { BuildingMetricContainer }