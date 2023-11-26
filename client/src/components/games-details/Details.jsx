import { useEffect , useState} from "react";
import { useNavigate, useParams,Link } from "react-router-dom"
import {  getGame } from "../../services/game-services";
import { createComment,getComments } from "../../services/comment-services";

export default function Details(){
    const navigate = useNavigate();
    const FORM_DATA = {
        comment : '',
    }
    const changeHandler = (event) => {
        setFormValues(state => ({
            ...state,
            [event.target.name] : event.target.value,
        }))
        setSuccessMessage('');
    }
    const {id} = useParams();
    const [game,setGame] = useState([]);
    const [comments,setComment] = useState([]);
    const [formValues,setFormValues] = useState(FORM_DATA);
    const [error,setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const commentValidator = () => {
        if (formValues.comment.length < 3) {
          setError('Comment should be at least 3 digits long!');
        } else {
          setError(false);
        }
      };
    
      const resetForm = () => {
        setFormValues(FORM_DATA);
        setSuccessMessage('Comment successfully created!');
      };
    useEffect(() => {
        const gameData = getGame(id).then((response) => {
            console.log(response);
            setGame(response);
        }).catch((err) => {
            navigate('/');
        });
    
        const commentsData = getComments(id).then((response) => {
            setComment(response);
            console.log(response);
        }).catch((err) => {
            navigate('/');
        });
    }, [id]);
    

    if(!game){
        return <div style={{color:'red'}}>Loading ...</div>
    }
    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game?.['imageUrl']} />
                    <h1>{game?.['title']}</h1>
                    <span className="levels">MaxLevel: {game?.['maxLevel']}</span>
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
                    <Link to={"/game-edit/" + id} className="button">Edit</Link>
                    <a href="#" className="button">Delete</a>
                </div>
            </div>

            {/* <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form
            className="form"
            onSubmit={(e) => {
              createComment(game?.['_id'], e).then(() => resetForm());
            }}
            method="POST"
          >
            {error && (
              <div className="error" style={{ color: 'red', fontSize: '15px' }}>
                <b>{error}</b>
              </div>
            )}
            {successMessage && (
              <div className="success" style={{ color: 'green', fontSize: '15px' }}>
                <b>{successMessage}</b>
              </div>
            )}
            <textarea
              name="comment"
              placeholder="Comment......"
              onChange={changeHandler}
              onBlur={commentValidator}
            ></textarea>
            <input className="btn submit" type="submit" value="Add Comment" />
          </form>
            </article>

        </section>
    )
}