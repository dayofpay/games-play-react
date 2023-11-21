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

export async function editGame(gameId,e) {


    e.preventDefault()

    const formData = new FormData(e.target);
    const title = formData.get('title');
    const category = formData.get('category');
    const maxLevel = formData.get('maxLevel');
    const imageUrl = formData.get('imageUrl');
    const summary = formData.get('summary');


    const newGame = await request.put('http://localhost:3030/jsonstore/games/' + gameId, {
        title,
        category,
        maxLevel,
        imageUrl,
        summary,
    })

    return newGame;

    // // if(comment){
    // //     const newComment = await request.post('http://localhost:3030/jsonstore/comments/', {
    // //         comment_user : 'Guest', 
    // //         comment_content : comment,
    // //         post_id : gameId
    // //     });
    
    // //     return newComment;
    // };
    
}
