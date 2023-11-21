import { useEffect,useState } from "react"
import { useParams} from "react-router-dom"
import { editGame, getGame } from "../../services/game-services";
export default function Edit(){

    const {id} = useParams();
    const [game,setGame] = useState([]);
    const FORM_DATA = {
        title : '',
        category : '',
        maxLevel : '',
        imageUrl : '',
        summary : '',
    };
    const FORM_KEYS = {
        title: 'title',
        category : 'category',
        maxLevel : 'maxLevel',
        imageUrl : 'imageUrl',
        summary : 'summary'        
    }
    const [formValues,setFormValues] = useState(FORM_DATA);
    useEffect(() => {
        const gameData = getGame(id).then((response) => {
            setFormValues(response)
        }).catch((err) => {
            location.href = "/"
        })
    },[id]);

    const changeHandler = (event) => {
        setFormValues(state => ({
            ...state,
            [event.target.name] : event.target.value,
        }))

    }
    return (
        <section id="edit-page" className="auth">
        <form id="edit" onSubmit={editGame}>
            <div className="container">

                <h1>Edit Game</h1>
                <label htmlFor="leg-title">Legendary title:</label>
                <input type="text" id={FORM_KEYS.title} name={FORM_KEYS.title} value={formValues.title} onChange={changeHandler}/>

                <label htmlFor="category">Category:</label>
                <input type="text" id={FORM_KEYS.category} name={FORM_KEYS.category} value={formValues.category} onChange={changeHandler}/>

                <label htmlFor="levels">MaxLevel:</label>
                <input type="number" id={FORM_KEYS.maxLevel} name={FORM_KEYS.maxLevel} min="1" value={formValues.maxLevel} onChange={changeHandler}/>

                <label htmlFor="game-img">Image:</label>
                <input type="text" id={FORM_KEYS.imageUrl} name={FORM_KEYS.imageUrl} value={formValues.imageUrl} onChange={changeHandler}/>

                <label htmlFor="summary">Summary:</label>
                <textarea name={FORM_KEYS.summary} id={FORM_KEYS.summary} onChange={changeHandler}></textarea>
                <input className="btn submit" type="submit" value="Edit Game" />

            </div>
        </form>
    </section>
    )
}