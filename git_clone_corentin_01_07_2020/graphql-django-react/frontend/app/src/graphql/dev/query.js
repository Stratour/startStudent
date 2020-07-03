import {gql} from 'apollo-boost'

export const GET_DIRECTOR = gql`
{
    dev {
        allDirector {
            userFk {
                id,
                username,
                password,
                email
            }
            profilePic
        }
    }
}
`

export const GET_SCHOOL = gql`
{
    dev {
        allSchool {
            picture
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
            schDirector {
                profilePic,
                userFk{
                    username,
                    email
                }
            }
        }
    }
}
`
export const GET_ENTITY = gql`
{
    dev {
        allEntity {
            schEntName,
            schEntStreet,
            schEntPostcode,
            schEntCity,
            schEntCountry,
            schEntNumStreet,
            schEntDepartment,
        }
    }
}
`