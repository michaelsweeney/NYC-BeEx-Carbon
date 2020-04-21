import React from 'react';





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
            console.log(e.target.classList)
            if ((
                !e.target.classList.contains('modal-content')
            ) 

            &&

            (e.target.classList.contains('modal')))
            
            {
                this.props.callback()
            }
        })
    }

    render() {
        return (
            <div className={`modal ${this.props.isactive ? 'active' : 'inactive'}`}>

                <div className='modal-content'>
                    <button onClick={this.setInactive}>x</button>
                    <p>
                        Content content content
                </p></div>

            </div>
        )
    }
}



export { Modal }