import axios from 'axios';

const DESC_TYPES = ['vote_average', 'release_date', 'vote_count', 'revenue', 'budget', 'runtime'];

const DELAY = 0;

const delay = value => new Promise((resolve) => {
    setTimeout(() => {
        resolve(value);
    }, DELAY);
});

export function create(movie) {
    return axios
        .post('http://localhost:4000/movies', movie)
        .then(delay);
}

export function read(sortBy, filter, search, offset) {
    const sortOrder = DESC_TYPES.includes(sortBy) ? 'desc' : 'asc';
    return axios
        .get('http://localhost:4000/movies', {
            params: {
                sortBy,
                filter: filter && filter.join(','),
                sortOrder,
                searchBy: 'title',
                search,
                offset,
            },
        })
        .then(delay);
}

export function update(movie) {
    return axios
        .put('http://localhost:4000/movies', movie)
        .then(delay);
}

export function remove(id) {
    return axios
        .delete(`http://localhost:4000/movies/${id}`)
        .then(delay);
}
