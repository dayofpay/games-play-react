import { useContext } from "react"
import useForm from "../../hooks/useForm"

export default function Login(){

    const {values,onChange, onSubmit} = useForm();


    return (

        <section id="login-page" className="auth">
        <form id="login" onSubmit={onSubmit}>

            <div className="container">
                <div className="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" onChange={onChange}/>

                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password" onChange={onChange}/>
                <input type="submit" className="btn submit" value="Login" onChange={onChange}/>
                <p className="field">
                    <span>If you don't have profile click <a href="#">here</a></span>
                </p>
            </div>
        </form>
    </section>

    )
}