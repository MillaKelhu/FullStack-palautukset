import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const handleRequest = (request) => {
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return handleRequest(request)
}

const addNew = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return handleRequest(request)
}

const deleteObject = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return handleRequest(request)
}

export default {
    getAll,
    addNew,
    deleteObject
}
