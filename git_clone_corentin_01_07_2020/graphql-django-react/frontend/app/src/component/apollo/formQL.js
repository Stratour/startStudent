import {Mutation} from 'react-apollo'
import React from 'react';
import {gql} from 'apollo-boost'
import File from './../native/file'

export class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wrap:{}
        }
        for(let i in this.props) {
            if(i !== 'name') {
                this.state.wrap[i] = this.props[i]
            }
        }
        this.name = this.props.name
    }
    render() {
        return (
            <input {...this.state.wrap}/>
        )
    }
}

export default class FormQL extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            send:false
        }
    }
    make_variable(events) {
        let data = {}
        let files = []
        for(let i of events.target.elements) {
            if(i.type !== "file" && i.type !== "submit") {
                data[i.name] = i.value
            }else{
                if(i.type === 'file'){
                    files.push(i)
                }
            }
        }
        let file = new File(...files)
        return {param:{variables:{...data,...this.props.header}},file:(files.length > 0 ? file : null)}
    }
    render() {
        return (
            <div>
                <Mutation onCompleted={this.props.completed} mutation={this.props.mutation}>
                    {
                        (action,{data}) => {
                            return (
                                <form onSubmit={
                                        (events) => {
                                            events.preventDefault()
                                            let variables = this.make_variable(events) 
                                            let call = (this.props.callback ? this.props.callback(variables) : null)
                                            variables = (call ? call : variables)
                                            if(variables.file !== null){
                                                variables.file.sendFile((file) => {
                                                    if(file.state) {
                                                        console.log("Added school")
                                                        variables.param.variables[file.name] = file.url
                                                        action(variables.param)
                                                    }
                                                })
                                            }else {
                                                action(variables.param)
                                            }
                                        }
                                    }
                                    className={this.props.className}>
                                    {this.props.children}
                                </form>
                            )
                        }
                    }
                </Mutation>
            </div>
        )
    }
}
