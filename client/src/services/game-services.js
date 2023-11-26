import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/jsonstore/games'
const commentUrl = 'http://localhost:3030/jsonstore/comments/';
export const getAll = async () => {
    const result = await request.get(baseUrl);

    return Object.values(result);
};

export const getGame = async (id) => {

    const result = await request.get(baseUrl + `/${id}`);

    return (result);
}

export async function editGame(gameId,e,validator_settings) {


    e.preventDefault()
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const category = formData.get('category');
    const maxLevel = formData.get('maxLevel');
    const imageUrl = formData.get('imageUrl');
    const summary = formData.get('summary');
    const hasErrors = Array.from(Object.values(validator_settings)).map(x => x === true)
        if(!hasErrors.includes(true)){
     const newGame = await request.put('http://localhost:3030/jsonstore/games/' + gameId, {
         title,
         category,
         maxLevel,
         imageUrl,
         summary,
         _id: gameId,
     })
       }



    // return newGame;


    
}

export async function createGame(gameData){
    const result = await request.post('http://localhost:3030/jsonstore/games',{
        ...gameData
    });

    return result;
}
