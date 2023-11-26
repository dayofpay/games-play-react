import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getGame } from "../../services/game-services";
import { createComment, getComments } from "../../services/comment-services";

export default function Details() {
  const navigate = useNavigate();
  const FORM_DATA = {
    comment: "",
  };
  const changeHandler = (event) => {
    setFormValues((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
    setSuccessMessage("");
  };
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const [comments, setComment] = useState([]);
  const [formValues, setFormValues] = useState(FORM_DATA);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const commentValidator = () => {
    if (formValues.comment.length < 3) {
      setError("Comment should be at least 3 digits long!");
    } else {
      setError(false);
    }
  };

  const resetForm = () => {
    setFormValues(FORM_DATA);
    setSuccessMessage("Comment successfully created!");
  };

  useEffect(() => {
    const fetchGameAndComments = async () => {
      try {
        const gameData = await getGame(id);
        setGame(gameData);

        const commentsData = await getComments(id);
        setComment(commentsData);
      } catch (err) {
        navigate("/");
      }
    };


    fetchGameAndComments();
  }, [id, navigate]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = await createComment(game?._id, e);
      setComment((prevComments) => [...prevComments, newComment]);
      resetForm();
    } catch (error) {
      setError("Failed to add comment. Please try again.");
    }
  };

  if (!game) {
    return <div style={{ color: "red" }}>Loading ...</div>;
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
                    {game?.['summary'] ? game?.['summary'] : 'This game has no summary yet !'}
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
                <form className="form" onSubmit={(e) => addComment(e)} method="POST">
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