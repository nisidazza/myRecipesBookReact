import client from 'superagent'
import { getEncodedToken } from 'authenticare/client'
import { isAuthenticated } from 'authenticare/client'

let httpClient = {
    get: function (url) {
        let request = client.get(url)
        return setupHttpRequest(request)
    },
    post: function (url) {
        let request = client.post(url)
        return setupHttpRequest(request)
    },
    patch: function (url) {
        let request = client.patch(url)
        return setupHttpRequest(request)
    },
    delete: function (url) {
        let request = client.delete(url)
        return setupHttpRequest(request)
    },
}

function setupHttpRequest(request) {
    request.set({ 'Accept': 'application/json' })
    if (isAuthenticated()) {
        request.set({ 'Authorization': `Bearer ${getEncodedToken()}` })
    }
    return request
}

export { httpClient }