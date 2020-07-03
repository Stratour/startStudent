import React from 'react'
import Header from './header'

export default class Director extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div>
                <Header back={this.props.back}/> 
                <div className="p-5 bg-light rounded border border-secondary mx-auto my-4 container">
                    <div className="row">
                        <div className="col-2">
                            <img className="w-100" src={`http://localhost:8000/media/${this.props.director.profilePic}`}/>
                        </div>
                        <div className="col-10">
                            <p>Welcome director {this.props.director.userFk.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
