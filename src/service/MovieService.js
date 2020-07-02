import axios from 'axios';

export function create(movie) {
    return axios
        .post('http://localhost:4000/movies', movie);
}

export function read() {
    return axios
        .get('http://localhost:4000/movies');
}

export function update(movie) {
    return axios
        .put('http://localhost:4000/movies', movie);
}

export function remove(id) {
    return axios
        .delete(`http://localhost:4000/movies/${id}`);
}
