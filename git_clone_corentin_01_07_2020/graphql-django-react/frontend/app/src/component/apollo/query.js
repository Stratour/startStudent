import {Query as BaseQuery} from 'react-apollo'
import React from 'react';

let omit = (data,...exclude) => {
    let makeObj = {}
    for(let i in data) {
        let add = true
        for(let j in exclude) {
            if(i === j) {
                add = false
            }
        }
        if(add) {
            makeObj[i] = data[i]
        }
    }
    return makeObj
}

export class Loading extends React.Component{
    render() {
        return this.props.children
    }
}
export class Error extends React.Component{
    render() {
        return this.props.children
    }
}

export class Success extends React.Component{
    render() {
        return this.props.children
    }
}

export class Idle extends React.Component{
    render() {
        return this.props.children
    }
}

export default class Query extends React.Component{
    constructor(props) {
        super(props)
        this.ref = () => {}
    }
    verify() {
        let loading = null
        let error = null
        let success = null
        let idle = null
        let restProps = {}
        let queryProps = {}
        for(let i of this.props.children) {
            let name = i.type.name
            if(name === 'Loading')
                loading = i
            else if(name === "Error")
                error = i
            else if(name === "Success")
                success = i
            else if(name === "Idle")
                idle = i
        }    
        if(!loading || !error || !success || !idle)
            throw Error("Query need to have at least a Loading,Error,Idle and Success component")
        for(let i in this.props){
            if(i !== 'children' && i !== 'refetch')
                queryProps[i] = this.props[i]
            else
                restProps[i] = this.props[i]
        }
        this.setState({data:{loading,error,success,idle,queryProps,restProps}})
    }
    checkIfFunction(value,data) {
        let type = value[0].props.children
        return typeof(type) === "function" ? type(data) : type
    }
    getComponent = (name) => {
        return this.props.children.filter(i => i.type.name === name)
    }

    launch() {
        if(this.props.launch) {
            return (
                <BaseQuery {...omit(this.props,'children')}>
                    {({loading,error,data,refetch}) => {
                        if(this.props.refetch)
                            this.props.refetch(refetch)
                        if(loading) return this.checkIfFunction(this.getComponent("Loading"),loading)
                        if(error) return this.checkIfFunction(this.getComponent("Error"),error)
                        return this.checkIfFunction(this.getComponent("Success"),data)
                    }}
                </BaseQuery>
            )
        }
        return this.getComponent("Idle")
    }
    render() {
        return (
            <div>
                {this.launch()}
            </div>
        )
    }
}