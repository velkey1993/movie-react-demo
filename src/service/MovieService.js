import axios from 'axios';

const DESC_TYPES = ['vote_average', 'release_date', 'vote_count', 'revenue', 'budget', 'runtime'];

const DELAY = 0;

const delay = value => new Promise((resolve) => {
    setTimeout(() => {
        resolve(value);
    }, DELAY);
});

export default class MovieService {
    static create(movie) {
        return axios
            .post('http://localhost:4000/movies', movie)
            .then(delay);
    }

    static searchMovies(sortBy, filter, search, offset) {
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

    static read(id) {
        return axios
            .get(`http://localhost:4000/movies/${id}`)
            .then(delay);
    }

    static update(movie) {
        return axios
            .put('http://localhost:4000/movies', movie)
            .then(delay);
    }

    static remove(id) {
        return axios
            .delete(`http://localhost:4000/movies/${id}`)
            .then(delay);
    }
}

