import CSRF from './csrf'

export default class File {
    constructor(...file) {
        this.files = file
    }
    getFile() {
        return this.files.map((file) => {
            return {
                name:file.name,
                value:file
            }
        })
    }
    getFilename(value) {
        let arr = value.split('\\')
        return arr[arr.length - 1]
    }
    getData() {
        let obj = {}
        this.files.forEach((file) => {
            obj[file.name] = this.getFilename(file.value)
        })
        return obj
    }
    async sendFile(onSuccess,onError = (err) => {}) {
        let formData = new FormData()

        for(let i of this.files) {
            console.log(i)
            formData.append(i.name,i.files[0],this.getFilename(i.value))
        }

        let token = await new CSRF().getToken()
        fetch("http://localhost:8000/file/",{
            method:'POST',
            body:formData,
            credentials:'include',
            headers:{
                'X-CSRFToken':token
            }
        }).then(res => res.json())
        .then(file => {
            onSuccess(file)
        })
        .catch(err => { 
            onError(err)
        })
    }
}