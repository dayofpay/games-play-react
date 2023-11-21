import { useEffect,useState } from "react"
import { useParams} from "react-router-dom"
import { editGame, getGame } from "../../services/game-services";
export default function Edit(){
    const VALIDATOR_STATUS = {
        title : false,
        category : false,
        maxLevel : false,
        imageUrl : false,
        summary : false,
    }
    const VALIDATOR_SETTINGS = {
        title: (value) => {
          if (value.length < 2 || value.length > 15) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              title: true,
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              title: false,
            }));
          }
        },
        category : (value) => {
            if(value.length < 3 || value.length > 10){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    category: true,
                  }));
            }
            else{
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    category: false,
                  }));
            }
        },
        maxLevel : (value) => {
            const toNumber = Number(value);

            if(toNumber < 1 || toNumber > 1000){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    maxLevel: true,
                  }));
            }
            else{
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    maxLevel: false,
                  }));
            }
        },
        imageUrl: (value) => {
            const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
          
            if (!urlRegex.test(value)) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                imageUrl: true,
              }));
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                imageUrl: false,
              }));
            }
          },
          summary : (value) => {
            if(value.length < 5 || value.length > 3500){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    summary: true,
                  }));
            }
            else{
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    summary: false,
                  }));
            }
          }

      };

    const {id} = useParams();
    const [game,setGame] = useState([]);
    const [errors,setErrors] = useState(VALIDATOR_STATUS);
    const [hasError, setErrorState] = useState(false);
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

    // const runValidators = (e) => {
    //     VALIDATOR_SETTINGS[e.target.name](e.target.value);
    //     setErrors((updatedErrors) => {
    //       console.log(updatedErrors);
    //       return updatedErrors;
    //     });
    //   };
      
    useEffect(() => {
        const gameData = getGame(id).then((response) => {
            console.log(response);
            setFormValues(response)
        }).catch((err) => {
            location.href = "/"
        })
    },[id]);

    const changeHandler = (event) => {
        VALIDATOR_SETTINGS[event.target.name](event.target.value);
        setErrors((updatedErrors) => {
          return updatedErrors;
        });
        setFormValues(state => ({
            ...state,
            [event.target.name] : event.target.value,
        }))

    }

    return (
        <section id="edit-page" className="auth">
        <form id="edit" onSubmit={((e) => editGame(id,e,errors))}>
            <div className="container">
                {Object.values(errors).includes(true) && (<p style={{color: "red", fontSize: '20px'}}>There were errors in some fields, please try again</p>)}
                <h1>Edit Game</h1>
                <label htmlFor="leg-title">Legendary title:</label>
                <input type="text" id={FORM_KEYS.title} name={FORM_KEYS.title} value={formValues.title} onChange={changeHandler} />

                <label htmlFor="category">Category:</label>
                <input type="text" id={FORM_KEYS.category} name={FORM_KEYS.category} value={formValues.category} onChange={changeHandler} />

                <label htmlFor="levels">MaxLevel:</label>
                <input type="number" id={FORM_KEYS.maxLevel} name={FORM_KEYS.maxLevel} min="1" value={formValues.maxLevel} onChange={changeHandler} />

                <label htmlFor="game-img">Image:</label>
                <input type="text" id={FORM_KEYS.imageUrl} name={FORM_KEYS.imageUrl} value={formValues.imageUrl} onChange={changeHandler} />

                <label htmlFor="summary">Summary:</label>
                <textarea name={FORM_KEYS.summary} id={FORM_KEYS.summary} onChange={changeHandler} value={formValues.summary} ></textarea>
                <input className="btn submit" type="submit" value="Edit Game" />

                
                
            </div>
        </form>
    </section>
    )
}