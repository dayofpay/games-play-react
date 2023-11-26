import { useState, useEffect } from "react"

export default function useForm(submitHandler,initialValues) {

    const [values,setValues] = useState(initialValues);

    const onChange = (event) => {
        setValues(state => ({
            ...state,
            [event.target.name] : event.target.value
        }))
    }



    const onSubmit = (event) => {
        event.preventDefault();

        submitHandler(values);
    }
    return {
        values,
        onChange,
        onSubmit,
    }
}