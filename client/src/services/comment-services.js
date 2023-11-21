
import * as request from '../lib/request'
export async function createComment(gameId,e) {


    e.preventDefault()

    const formData = new FormData(e.target);
    const comment = formData.get('comment');

    if(comment){
        const newComment = await request.post('http://localhost:3030/jsonstore/comments/', {
            comment_user : 'Guest', 
            comment_content : comment,
            post_id : gameId
        });
    
        return newComment;
    };
    
}

export const getComments = async (postId) => {
    const result = await request.get("http://localhost:3030/jsonstore/comments/");

    const comments = [];
    Object.values(result).map(comment => comment.post_id === postId ? comments.push(comment) : null);
    return comments;
}