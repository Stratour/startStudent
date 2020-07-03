import React from 'react';
import logo from './logo.svg';
import './App.css';
import List,{Reducer,Shower} from './component/list'
import omit from 'lodash'
import Client from './component/apollo/client'
import FormQL,{Input} from './component/apollo/formQL'
import Query,{Success,Loading,Error,Idle} from './component/apollo/query'
import {ApolloProvider} from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import {Mutation} from 'react-apollo'
import Cookies from 'js-cookie'
import Director from './scene/director';
import LoadingScreen,{ScreenLoader,LoadedScreen} from './component/loading'
import Admin from './scene/admin'
//const BrowserRouter = require("react-router-dom").BrowserRouter;
//const Route = require("react-router-dom").Route;
//const Link = require("react-router-dom").Link;

const client = new Client("graphql","csrf")

const GET_USER = gql`
{
    user {
        userFk {
            username,
            password,
            email
        }
        groupFk {
            name
        }
        profilePic
    }
}
`
const GET_ADMIN = gql`
{
    dev {
        admin {
            username,
            password,
            email
        }
    }
}
`


const LOG_IN = gql`
mutation createToken($username: String!,$password: String!) {
    tokenAuth(username:$username,password:$password) {
        token
    }
}
`

class App extends React.Component {
    constructor() {
        super()
        let admin = Cookies.get("admin") == "true" ? true : false
        this.state = {
            account: {},
            launch:Cookies.get("jwt_token_auth") != 'null' ? true : false,
            admin:admin,
            logMessage:admin ? "Connectez-vous en tant que user" : "Connectez-vous en tant que admin"
        }
    }
    componentDidMount() {
        console.log("Component loaded")
    }
    connectClick = () => {
        let state = this.state.admin
        let admin = true
        if(state)
            admin = false
        this.setState({admin:admin,logMessage:admin ? "Connectez-vous en tant que user" : "Connectez-vous en tant que admin"})
        Cookies.set("admin",admin)
    }
    stateButton = () => {
        if(this.state.admin) {
            return (
                <button className="btn btn-default btn-warning rounded my-2" onClick={this.connectClick}>
                    {this.state.logMessage}
                </button> 
            )
        }
        return (
            <button className="btn btn-default btn-danger rounded my-2" onClick={this.connectClick}>
                {this.state.logMessage}
            </button> 
        )
    }
    connectButton = () => {
        return this.stateButton()
    }
    resetConnection = () => this.setState({launch:false})
    connectPermissions = (user) => {
        if(user.groupFk) {
            if(user.groupFk.name === "directors") {
                return <Director back={this.resetConnection} director={user}/>
            }
        }
        return <Admin back={this.resetConnection}/>
    }
    logged = () => {
        return (
            <Query launch={this.state.launch} query={this.state.admin ? GET_ADMIN : GET_USER}>
                <Loading>
                    <p>Loading</p>
                </Loading>
                <Error>
                    {(error) => {
                        this.setState({launch:false})
                        return <p>{error.message}</p>
                    }}
                </Error>
                <Success>
                    {(success) => {
                        return this.connectPermissions(this.state.admin ? success.dev.admin : success.user)
                    }}
                </Success>
                <Idle>
                    <div className="bg-dark h-100 position-absolute w-100">
                        <div className="container bg-light my-5 p-5 rounded">
                            <div className="bg-primary p-5 rounded mt-3">
                                <h2 className="text-center text-light">Connectez-vous</h2>
                                <div className="w-100 text-center">
                                    {this.connectButton()}
                                </div>
                                <FormQL className="form-group mt-3" completed={(data) => {
                                    Cookies.set("jwt_token_auth",`JWT ${data.tokenAuth.token}`)
                                    this.setState({launch:true})
                                }}
                                mutation={LOG_IN}>
                                    <div className="row">
                                        <div className="col-4">
                                            <input name="username" type="text" class="form-control"></input>
                                        </div>
                                        <div className="col-4">
                                            <input name="password" type="password" class="form-control"></input>
                                        </div>
                                        <div className="col-4">
                                            <input className="btn-default btn-dark form-control mx-auto" type="submit"></input>
                                        </div>
                                    </div>
                                </FormQL>
                            </div>
                        </div>
                    </div>
                </Idle>
            </Query>
        )
    }
    render() {
        return (
            <ApolloProvider client={client.client}>
                {this.logged()}
            </ApolloProvider>
        );
    }
}
export default App;
