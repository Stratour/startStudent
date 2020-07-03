import Cookies from 'js-cookie'
import ApolloClient from 'apollo-boost'

export default class Client {
    constructor(uri,csrf) {
        this.uri = uri
        this.client = new ApolloClient({
            uri:"http://localhost:8000/" + this.uri + '/',
            credentials:'include',
            request: async (operation) => {
                let token = ""
                await fetch("http://localhost:8000/" + csrf)
                .then(data => data.json())
                .then(data => token = data.csrftoken)
                Cookies.set('csrftoken',token)
                let jwt = Cookies.get("jwt_token_auth")
                let header = {
                    headers:{
                        'X-CSRFToken':token,
                        'Authorization':jwt ? jwt : ''
                    }
                }
                operation.setContext(header)
            }
        })
    }
}