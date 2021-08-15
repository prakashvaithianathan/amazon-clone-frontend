import axios from 'axios'

const instance = axios.create({
    baseURL:'https://amazonclone-backend-nodejs.herokuapp.com/'
})


export default instance