import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editGame, getGame } from "../../services/game-services";

export default function Edit() {
  const VALIDATOR_SETTINGS = {
    title: (value) => {
      if (value.length < 2 || value.length > 15) {
        return "Title should be between 2 and 15 characters.";
      }
      return "";
    },
    category: (value) => {
      if (value.length < 3 || value.length > 10) {
        return "Category should be between 3 and 10 characters.";
      }
      return "";
    },
    maxLevel: (value) => {
      const toNumber = Number(value);
      if (toNumber < 1 || toNumber > 1000) {
        return "MaxLevel should be between 1 and 1000.";
      }
      return "";
    },
    imageUrl: (value) => {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(value)) {
        return "Invalid URL format for Image.";
      }
      return "";
    },
    summary: (value) => {
      if (value.length < 5 || value.length > 3500) {
        return "Summary should be between 5 and 3500 characters.";
      }
      return "";
    },
  };

  const { id } = useParams();
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    maxLevel: "",
    imageUrl: "",
    summary: "",
  });
  const FORM_DATA = {
    title: "",
    category: "",
    maxLevel: "",
    imageUrl: "",
    summary: "",
  };

  const FORM_KEYS = {
    title: "title",
    category: "category",
    maxLevel: "maxLevel",
    imageUrl: "imageUrl",
    summary: "summary",
  };
  const [formValues, setFormValues] = useState(FORM_DATA);
  const [successMessage,setSuccessMessage] = useState('');
  useEffect(() => {
    const gameData = getGame(id)
      .then((response) => {
        console.log(response);
        setFormValues(response);
      })
      .catch((err) => {
        location.href = "/";
      });
  }, [id]);

  const changeHandler = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;


    const errorMessage = VALIDATOR_SETTINGS[fieldName](fieldValue);

  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));

    setFormValues((state) => ({
      ...state,
      [fieldName]: fieldValue,
    }));
  };
  const resetForm = () => {

    setSuccessMessage('Game successfully edited!');
  };
  return (
    <section id="edit-page" className="auth">
      <form id="edit" onSubmit={(e) => editGame(id, e, errors).then(() => resetForm())}>
        <div className="container">
          {Object.values(errors).some((error) => error !== "") && (
            <div style={{ color: "red", fontSize: "20px" }}>
              There were errors in some fields, please try again:
              <ul>
                {Object.entries(errors).map(([fieldName, error]) => (
                  <li key={fieldName}>{error}</li>
                ))}
              </ul>
            </div>
          )}
            {successMessage && (
              <div className="success" style={{ color: 'green', fontSize: '15px' }}>
                <b>{successMessage}</b>
              </div>
            )}
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