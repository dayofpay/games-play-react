import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/jsonstore/games'
const commentUrl = 'http://localhost:3030/jsonstore/comments/';
export const getAll = async () => {
    const result = await request.get(baseUrl);

    return Object.values(result);
};

export const getGame = async (id) => {

    const result = await request.get(baseUrl + `/${id}`);

    return Object.values(result);
}



