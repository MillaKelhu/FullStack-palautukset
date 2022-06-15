import axios from 'axios'
const baseUrl = '/api/persons'

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

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return handleRequest(request)
}

export default {
    getAll,
    addNew,
    deleteObject,
    update
}
