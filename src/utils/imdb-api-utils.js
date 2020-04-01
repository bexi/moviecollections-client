import config from '../config';
import axios from "axios";

const headers = {
    headers: { Authorization: `Bearer ${config.imdbApi.key}` }
};

export const IMDB_GET = (path, body) => {
    return axios.get(
        path,
        headers
    );
}