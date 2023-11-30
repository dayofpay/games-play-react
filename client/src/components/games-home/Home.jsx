import React, { useEffect, useState } from "react";
import { getAll } from "../../services/game-services";
import { Link } from "react-router-dom";
import withAuth from "../../HOC/withAuth";
function Home({email}) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAll()
      .then((response) => {
        setGames(response);
      })
      .catch((err) => {
        localStorage.clear();
      });
  }, []);

  return (
    <section id="welcome-world">
      <h1 style={{color:'red',fontSize:'50x'}}>Welcome, {email ? email : 'Guest'}</h1>
      <div className="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
      </div>
      <img src="./images/four_slider_img01.png" alt="hero" />

      <div id="home-page">
        <h1>Latest Games</h1>

        {games.length > 0 ? (
          games.map((game, index) => (
            <div className="game" key={index}>
              <div className="image-wrap">
                <img src={game.imageUrl} alt={game.title} />
              </div>
              <h3>{game.title}</h3>
              <div className="rating">
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
              </div>
              <div className="data-buttons">

                <Link to={"/game-details/" + game._id} className="btn details-btn">
                  Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-articles">No games yet</p>
        )}
      </div>
    </section>
  );
}

const EnhancedHome = withAuth(Home);

export default EnhancedHome;