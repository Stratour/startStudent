import React from 'react'
import {Mutation} from 'react-apollo'
import Query,{Loading,Error,Success,Idle} from '../../../component/apollo/query'
import { gql } from 'apollo-boost'
import FormQL from '../../../component/apollo/formQL'
import {CREATE_SCHOOL} from '../../../graphql/dev/mutation'
import {GET_SCHOOL, GET_DIRECTOR} from '../../../graphql/dev/query'

export default class School extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            getDirector:false
        }
    }
    create_variable(elements,...name) {
        let data = {}
        for(let i of elements) {
            if(i.value.trim() != "" && name.find(value => i.name === value)) {
                data[i.name] = i.value
            }
        }
        return {variables:{...data}}
    }
    school_modal() {
        return (
            <div id="school_modal" className="fade modal" role="dialog">
                <div className="modal-dialog modal-school" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Title</h4>
                        </div>
                        <div className="modal-body">
                            <FormQL completed={(data) => {
                                console.log(data)
                            }}className="form-group" mutation={CREATE_SCHOOL}>
                                <div className="text-center col-12">
                                    <h5 className="text-center">Photo de l'école</h5>
                                    <input type="file" name="picture" />
                                    <div className="mt-4">
                                        <div className="row">
                                           <div className="col-4">
                                                <h5 className="text-center">Nom de l'école</h5>
                                                <input className="form-control m-auto" type="text" name="name" />
                                           </div>
                                           <div className="col-4">
                                                <h5>Rue de l'ecole</h5>
                                                <input className="form-control m-auto" type="text" name="street" />
                                            </div>
                                            <div className="col-4">
                                                <h5>n°rue</h5>
                                                <input className="form-control" type="number" name="numStreet" />
                                            </div>
                                        </div>
                                        <div className="mt-2 row">
                                            <div className="col-3">
                                                <h5>Code postal</h5>
                                                <input className="form-control" name="postCode" type="number"/>
                                            </div>
                                            <div className="col-3">
                                                <h5>Ville</h5>
                                                <input name="city" className="form-control"/>
                                            </div>
                                            <div className="col-3">
                                                <h5>Pays</h5>
                                                <input name="country" className="form-control"/>
                                            </div>
                                            <div className="col-3">
                                                <h5>Departement</h5>
                                                <input name="department" className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <Query launch={this.state.getDirector} query={GET_DIRECTOR}>
                                        <Success>
                                            {(value) => {
                                                let data = value.dev.allDirector
                                                console.log(data)
                                                return (
                                                    <select name="directorFk" className="mt-3 ">
                                                        {data.map((mapped) => {
                                                            return (
                                                                <option value={mapped.userFk.id}>{mapped.userFk.username}</option>
                                                            )
                                                        })}
                                                    </select>
                                                )
                                            }}
                                        </Success>
                                        <Loading>
                                            <p>Loading director list</p>
                                        </Loading>
                                        <Error>
                                            {(error) => {
                                                return <p>{error.message}</p>
                                            }}
                                        </Error>
                                        <Idle>
                                            <p>Loading director list</p>
                                        </Idle>
                                    </Query>
                                    <input type="submit" className="mt-2 btn btn-default btn-success"/>
                                </div>
                            </FormQL>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="w-100">
                <Query launch={true} query={GET_SCHOOL}>
                    <Success>
                        {(data) => {
                            return (
                                <div>
                                   <button data-target="#school_modal" data-toggle="modal" onClick={(event) => {
                                       event.preventDefault()
                                       this.setState({
                                           getDirector:true
                                       })
                                   }}
                                    className="add_director_button btn btn-default rounded-circle btn-success">
                                        <h4 className="m-0">+</h4>
                                    </button>
                                    {data.dev.allSchool.map((value) => {
                                        let entity = value.schEntity
                                        console.log(value)
                                        return (
                                            <div className="container mt-5 bg-light p-5 rounded">
                                                <div className="row">
                                                    <div className="col-5">
                                                        <h5 className="text-center font-weight-bolder text-white">{value.name}</h5>
                                                        <img className="rounded w-100" src={'http://localhost:8000' + value.picture} />
                                                    </div>
                                                    <div className="col-7">
                                                        <div className="bg-info w-100 h-100 school_info rounded py-1 px-2">
                                                            <p>Nom : {entity.schEntName}</p>
                                                            <p>Rue du {entity.schEntName} n°{entity.schEntNumStreet}</p>
                                                            <p>Pays : {entity.schEntCountry}</p>
                                                            <p>Ville : {entity.schEntCity}</p>
                                                            <p>Departement : {entity.schEntDepartment}</p>
                                                            <p>Code postal : {entity.schEntPostcode}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mx-auto mt-3 bg-dark w-50 p-3 rounded">
                                                    <img className="img-director-school" src={'http://localhost:8000' + value.schDirector.profilePic} />
                                                    <div className="bg-primary w-75 ml-3 rounded">
                                                        <p className="ml-3 text-white mt-2">Nom d'utilisateur : {value.schDirector.userFk.username}</p>
                                                        <p className="ml-3 text-white">Email : {value.schDirector.userFk.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }}
                    </Success>
                    <Error>
                        {(error) => {
                            return (
                                <p className="text-center">{error.message}</p>
                            )
                        }}
                    </Error>
                    <Loading>
                        <p>Loading school data</p>
                    </Loading>
                    <Idle>
                        <p>Loading school data</p>
                    </Idle>
                </Query>
                {this.school_modal()}
            </div>
        )
    }
}