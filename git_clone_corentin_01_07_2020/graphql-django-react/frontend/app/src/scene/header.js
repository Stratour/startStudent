import React from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

export default class Header extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            redirect:false
        }
    }
    disconnect = () => {
        Cookies.set("jwt_token_auth",null)
        Cookies.set("admin",false)
        this.props.back()
    }
    render() {
        return (
            <header className="p-3 position-sticky t-0 w-100 bg-light border-bottom border-primary">
                <div className="float-left">
                    <Link to="director">Director</Link>
                    <Link className="ml-2" to="school">School</Link>
                    <Link className="ml-2" to="entity">Entity</Link>
                </div>
                <div className="text-right">
                    <a onClick={this.disconnect} href="#">Déconnection</a>
                </div>
            </header>
        )
    }
}