import React from 'react'
import FormQL from './../../../component/apollo/formQL'
import {CREATE_ENTITY} from '../../../graphql/dev/mutation'
import Query,{Loading,Error,Idle,Success} from './../../../component/apollo/query'
import { GET_ENTITY } from '../../../graphql/dev/query'

export default class Entity extends React.Component {
    entity_modal() {
        return (
            <div id="entity_modal" className="fade modal" role="dialog">
                <div className="modal-dialog modal-school" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Title</h4>
                        </div>
                        <div className="modal-body">
                            <FormQL completed={(data) => {
                                console.log(data)
                            }}className="form-group" mutation={CREATE_ENTITY}>
                                <div className="text-center col-12">
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
            <div>
                <Query launch={true} query={GET_ENTITY}>
                    <Loading>
                        <p>Loading</p>
                    </Loading>
                    <Error>
                        {(error) => {
                            return (
                                <p>{error.message}</p>
                            )
                        }}
                    </Error>
                    <Success>
                        {(data) =>{
                            return (
                                <div>
                                    <button data-target="#entity_modal" data-toggle="modal"
                                    className="add_director_button btn btn-default rounded-circle btn-success">
                                        <h4 className="m-0">+</h4>
                                    </button>
                                    {data.dev.allEntity.map((entity) => {
                                        return (
                                            <div className="container mt-5 bg-light p-5 rounded">
                                                <p>Nom : {entity.schEntName}</p>
                                                <p>Rue du {entity.schEntName} n°{entity.schEntNumStreet}</p>
                                                <p>Pays : {entity.schEntCountry}</p>
                                                <p>Ville : {entity.schEntCity}</p>
                                                <p>Departement : {entity.schEntDepartment}</p>
                                                <p>Code postal : {entity.schEntPostcode}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }}
                    </Success>
                    <Idle>
                        <p>Idle</p>
                    </Idle>
                </Query>
                {this.entity_modal()}
            </div>
        )
    }
} 