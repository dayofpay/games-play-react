import React, { useEffect, useState } from "react";
import { getAll } from "../../services/game-services";
import { Link } from "react-router-dom";
export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAll()
      .then((response) => {
        setGames(response);
      })
      .catch((err) => {

      });
  }, []);

  return (
    <section id="welcome-world">
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

                <a href={"/game-details/" + game._id} className="btn details-btn">
                  Details
                </a>
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