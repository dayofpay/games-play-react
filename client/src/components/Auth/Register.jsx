import { useContext } from "react"
import AuthContext from "../../contexts/authContext"
import useForm from "../../hooks/useForm";

export default function Register(){
    const RegisterFormKeys = {
        Email : 'email',
        Password : 'password',
        ConfirmPassword : 'confirm-password',
    }
    const {registerSubmitHandler} = useContext(AuthContext);
    const {values,onChange,onSubmit} = useForm(registerSubmitHandler,{
    [RegisterFormKeys.Email] : '',
    [RegisterFormKeys.Password] : '',
    [RegisterFormKeys.ConfirmPassword] : '',

    })
    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com" value={values[RegisterFormKeys.Email]} onChange={onChange}/>

                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" value={values[RegisterFormKeys.Password]} onChange={onChange}/>

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password" value={values[RegisterFormKeys.ConfirmPassword]} onChange={onChange}/>

                    <input className="btn submit" type="submit" value="Register"/>

                    <p className="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    )
}