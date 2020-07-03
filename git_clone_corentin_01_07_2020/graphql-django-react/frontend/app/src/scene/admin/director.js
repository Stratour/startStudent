import React from 'react'
import File from '../../component/native/file'
import { Mutation } from 'react-apollo'
import Query, { Idle, Success, Error, Loading } from './../../component/apollo/query'
import { gql } from 'apollo-boost'
import School from './director/school'
import FormQL from '../../component/apollo/formQL'
import {CREATE_DIRECTOR} from '../../graphql/dev/mutation'
import {GET_DIRECTOR} from '../../graphql/dev/query'

export default class Director extends React.Component {
    constructor(props) {
        super(props)
    }
    director_modal = () => {
        return (
            <div className="modal fade" tabindex="-1" id="director_modal" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Enregistrer un directeur</h4>
                            <button className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>Entrer les informations</h5>
                            <Mutation mutation={CREATE_DIRECTOR}>
                                {(addDirector,result) => {
                                    return (
                                        <FormQL mutation={CREATE_DIRECTOR}>
                                            <div className="row justify-content-around">
                                                <input className="col-5" placeholder="Nom d'utilisateur" name="username" />
                                                <input className="col-5" placeholder="Mot de passe" type="password" name="password" />
                                                <input name="email" type="email" className="col-11 mt-2" placeholder="Email du directeur" />
                                            </div>
                                            <div className="mt-3">
                                                <input name="files" type="file"/>
                                                <input className="btn btn-default btn-success" type="submit" />
                                                <button className="ml-1 btn btn-default btn-danger" data-dismiss="modal">Close</button>
                                            </div>
                                        </FormQL>
                                    )
                                }}
                            </Mutation>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <Query launch={true} query={GET_DIRECTOR}>
                <Error>
                    {(error) => {
                        console.log(error)
                        return (
                            <p className="bg-white">Error when getting director : {error.message}</p>
                        )
                    }}
                </Error>
                <Success>
                    {(data) => {
                        return (
                            <div>
                                {this.director_modal()}
                                <h3 className="text-white mt-4 text-center">List of directors</h3>
                                <button data-target="#director_modal" data-toggle="modal" className="add_director_button btn btn-default rounded-circle btn-info">
                                    <h4 className="m-0">+</h4>
                                </button>
                                {data.dev.allDirector.map((value,index) => {
                                    let user = value.userFk
                                    console.log(value)
                                    return (
                                        <div className="container my-5">
                                            <div className="bg-light border border-primary rounded row p-3">
                                                <img className="col-2" src={`http://localhost:8000${value.profilePic}`}></img>
                                                <div className="col-10">
                                                    <p>Nom : {user.username}</p>
                                                    <p>Mot de passe : {user.password}</p>
                                                    <p>Email : {user.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                    )}}
                </Success>
                <Loading>
                    <p>Loading director</p>
                </Loading>
                <Idle>
                    <p>Getting director</p>
                </Idle>
            </Query>
        )
    }
}