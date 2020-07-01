import axios from 'axios';

const API_URL = 'http://localhost:4000/movies/';

export function create(movie) {
    return axios.post(API_URL, movie);
}

export function read() {
    return axios.get(API_URL);
}

export function update(movie) {
    return axios.put(API_URL, movie);
}

export function remove(id) {
    return axios.delete(API_URL + id);
}
