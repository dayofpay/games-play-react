import { useEffect,useState } from "react";
import { getAll } from "../../services/game-services";
export default function Catalogue(){

    const [games,setGames] = useState([]);
    useEffect(() => {
          getAll().then((games) => {
            setGames(Object.values(games))
            console.log(Object.values(games));
        })
    },[])
    if(!games.length){
        return <div style={{color:'red'}}>Loading</div>
    }
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {/* <!-- Display div: with information about every game (if any) --> */}
            {games.length ? (
            games.map((game,index) =>
            <div className="allGames" key={index}>
                <div className="allGames-info">
                    <img src={game.imageUrl} alt={game.title} />
                    <h6>{game.category}</h6>
                    <h2>{game.title}</h2>
                    <a href={'/game-details/' + game?.['_id']} className="details-button">Details</a>
                </div>
            </div>

            )
            ) : <h3 className="no-articles">No articles yet</h3> }

            

            {/* <!-- Display paragraph: If there is no games  --> */}

        </section>
    )
}