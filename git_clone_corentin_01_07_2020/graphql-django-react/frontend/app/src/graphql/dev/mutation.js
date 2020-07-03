import { gql } from 'apollo-boost';

export const CREATE_SCHOOL = gql`
mutation CreateSchoolMutation($picture: String,$name: String!,$postCode: Int!,$city: String,$directorFk: Int!,$department: String,
$country: String!,$street: String!,$numStreet: Int!) {
    createSchool(data: {
        name:$name,
        postCode:$postCode,
        city:$city,
        directorFk:$directorFk,
        department:$department,
        picture:$picture,
        country:$country,
        street:$street,
        numStreet:$numStreet
    }) {
        picture,
        schEntity {
            schEntName,
            schEntStreet,
            schEntPostcode,
            schEntCity,
            schEntCountry,
            schEntNumStreet,
            schEntDepartment,
            schSiteSet {
                schSitName,
                schSitStreet,
                schSitPostcode,
                schSitCity,
                schSitCountry,
                schSitNumStreet,
                schSitDepartment
            }
        }
    }
}
`
export const CREATE_DIRECTOR = gql`
mutation CreateDirectorMutation($username: String!,$password: String!,$email: String!,$files: String!) {
    createDirector(username:$username,password:$password,email:$email,files:$files) {
        userFk {
            username
        }
    }
}
`

export const CREATE_ENTITY = gql`
mutation CreateEntityMutation($picture: String,$name: String!,$postCode: Int!,$city: String,$department: String,
$country: String!,$street: String!,$numStreet: Int!) {
    createEntity(data: {
        name:$name,
        postCode:$postCode,
        city:$city,
        department:$department,
        picture:$picture,
        country:$country,
        street:$street,
        numStreet:$numStreet
    }) {
        schEntName,
        schEntStreet,
        schEntPostcode,
        schEntCity,
        schEntCountry,
        schEntNumStreet,
        schEntDepartment,
    }
}
`