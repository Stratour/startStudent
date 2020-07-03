import Cookies from 'js-cookie'

export default class CSRF {
    async getToken() {
        let token = ""
        await fetch("http://localhost:8000/csrf")
        .then(data => data.json())
        .then(data => token = data.csrftoken)
        Cookies.set('csrftoken',token)
        return token
    }
}