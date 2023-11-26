import { useContext } from "react";
import useForm from "../hooks/useForm";
import AuthContext from "../contexts/authContext";
export default function Create(){
    const CreateGameKeys = {
        Title: 'title',
        Category: 'category',
        MaxLevel: 'maxLevel',
        ImageUrl: 'imageUrl',
        Summary: 'summary'
    };
    const {createGameHandler} = useContext(AuthContext)
    const {values,onChange, onSubmit} = useForm(createGameHandler,{
        [CreateGameKeys.Title] : '',
        [CreateGameKeys.Category ] : '',
        [CreateGameKeys.MaxLevel ] : '',
        [CreateGameKeys.ImageUrl ] : '',
        [CreateGameKeys.Summary ] : '',
    });
    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id={CreateGameKeys.Title} name={CreateGameKeys.Title} onChange={onChange} value={values[CreateGameKeys.Title]} placeholder="Enter game title..."/>

                    <label htmlFor="category">Category:</label>
                    <input type="text" id={CreateGameKeys.Category} name={CreateGameKeys.Category} onChange={onChange} value={values[CreateGameKeys.Category]} placeholder="Enter game category..."/>

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id={CreateGameKeys.MaxLevel} name={CreateGameKeys.MaxLevel} onChange={onChange} value={values[CreateGameKeys.MaxLevel]} min="1" placeholder="1"/>

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id={CreateGameKeys.ImageUrl} name={CreateGameKeys.ImageUrl} onChange={onChange} value={values[CreateGameKeys.ImageUrl]} placeholder="Upload a photo..."/>

                    <label htmlFor="summary">Summary:</label>
                    <textarea name={CreateGameKeys.Summary} onChange={onChange} value={values[CreateGameKeys.Summary]} id={CreateGameKeys.Summary}></textarea>
                    <input className="btn submit" type="submit" value="Create Game"/>
                </div>
            </form>
        </section>
    )
}