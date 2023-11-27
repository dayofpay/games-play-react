import { createContext , useState} from "react";
import * as authService from '../services/authServices'
import { useNavigate } from "react-router-dom";
import PATH_LIST from "../paths";
import { createGame } from "../services/game-services";
export const AuthContext = createContext();

export const AuthProvider = ({
    children,

}) => {
    const navigate = useNavigate();
    const [auth,setAuth] = useState(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user_id');
  
      return {};
    })
  
    const loginSubmitHandler = async (values) => {
      const result = await authService.login(values.email,values.password);
  
      if(result.code !== 403){
        navigate(PATH_LIST.HOME);
      }
      setAuth(result);
      localStorage.setItem('accessToken',result.accessToken);
      localStorage.setItem('user_id', result._id);
      console.log(result);
    }
  
    const registerSubmitHandler = async (values) => {
      const result = await authService.register(values.email,values.password);
  
      if(result.code !== 403){
        navigate(PATH_LIST.HOME);
      }
      setAuth(result);
      localStorage.setItem('accessToken',result.accessToken)
  
      console.log(result);
    }
    const logoutHandler = () => {
      setAuth({});
      localStorage.removeItem('accessToken');
    
      navigate(PATH_LIST.HOME);
    }
  
    const createGameHandler = async (gameData) => {
      const game_status = await createGame(gameData);
  
      if(game_status){
        navigate('/game-details/' + game_status['_id']);
      }
    }
    const logValues = {loginSubmitHandler,registerSubmitHandler,createGameHandler,username:auth.username,password:auth.password,email:auth.email,isAuthenticated: !!auth.email,token: auth.accessToken,logoutHandler}
    return (
        <AuthContext.Provider value={logValues}>
            {children}
        </AuthContext.Provider>
    )
}
AuthContext.displayName = 'AuthContext';
export default AuthContext;