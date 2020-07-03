import React from 'react'
import Header from './header'
import Director from './admin/director'
import './admin.css'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import School from './admin/director/school'
import Entity from './admin/director/entity'

export default class Admin extends React.Component {
    render() {
        return (
            <Router>
                <div className="position-fixed w-100 h-100 back bg-dark"></div>
                <Header back={this.props.back}/>
                <Route path="/director">
                    <Director />
                </Route>
                <Route path="/school">
                    <School />
                </Route>
                <Route path='/entity'>
                    <Entity />
                </Route>
            </Router>
        )
    }
}
