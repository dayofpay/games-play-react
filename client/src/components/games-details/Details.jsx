import { useEffect , useState} from "react";
import { useParams } from "react-router-dom"
import { getComments, getGame } from "../../services/game-services";
export default function Details(){

    const {id} = useParams();

    const [game,setGame] = useState([]);
    const [comments,setComment] = useState([]);

    useEffect(() => {
        const gameData = getGame(id).then((response) => {
            console.log(response);
            setGame(response);
        }).catch((err) => {
            console.error(err);
        });

        const comments = getComments(id).then((response) => {
            setComment(response)
            console.log(response);
        }).catch((err) => {
            console.error(err);
        })
    },[]);

    if(!game){
        return <div style={{color:'red'}}>Loading ...</div>
    }
    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game[3]} />
                    <h1>{game[0]}</h1>
                    <span className="levels">MaxLevel: {game[2]}</span>
                    <p className="type">{game[1]}</p>
                </div>

                <p className="text">
                    Set in a world where fantasy creatures live side by side with humans. A human cop is forced to work
                    with an Orc to find a weapon everyone is prepared to kill for. Set in a world where fantasy
                    creatures live side by side with humans. A human cop is forced
                    to work with an Orc to find a weapon everyone is prepared to kill for.
                </p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {comments.length > 0 ? (
                            comments.map((comment,index) => 
                            <li className="comment" key={index}>
                            <p>{comment.comment_user + ":" + comment.comment_content}</p>
                        </li>
                            )

                        ) : (                    <p className="no-comment">No comments.</p>)}
                        {/* <!-- list all comments for current game (If any) --> */}

                    </ul>
                    {/* <!-- Display paragraph: If there are no games in the database --> */}

                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div>
            </div>

            {/* <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input className="btn submit" type="submit" value="Add Comment"/>
                </form>
            </article>

        </section>
    )
}