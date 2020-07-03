import React from 'react'

export class ScreenLoader extends React.Component {
    render() {
        return this.props.children
    }
}

export class LoadedScreen extends React.Component {
    render() {
        return this.props.children
    }
}

export default class LoadingScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state = {loading:true}
    }
    componentDidMount() {
        this.setState({loading:false})
    }
    load = () => {
        if(this.state.loading) {
            return this.props.children.filter(i => i.type.name === "ScreenLoader")
        }
        return this.props.children.filter(i => i.type.name === "LoadedScreen")
    }
    render() {
        return this.load()
    }
}