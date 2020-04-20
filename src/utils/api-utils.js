import { API } from "aws-amplify";
import config from '../config';

export const API_GET = (path) => {
    return API.get(config.api.name, path);
}

export const API_POST = (path, body) => {
    return API.post(config.api.name, path, {
        body: body
    });
}

export const API_PUT = (path, body) => {
    return API.put(config.api.name, path, {
        body: body
    });
}

export const API_DELETE = (path) => {
    return API.del(config.api.name, path);
}