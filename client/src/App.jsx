
import { Routes , Route, useNavigate } from "react-router-dom"
import { useState } from "react"

import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Logout from "./components/Auth/Logout"

import Catalogue from "./components/game-catalogue/Catalogue"
import Edit from "./components/game-edit/Edit"
import Details from "./components/games-details/Details"
import Home from "./components/games-home/Home"

import Header from "./components/header/Header"

import AuthContext from "./contexts/authContext"
import * as authService from "./services/authServices"
import PATH_LIST from "./paths"
function App() {
  const navigate = useNavigate();
  const [auth,setAuth] = useState(() => {
    localStorage.removeItem('accessToken');


    return {};
  })

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email,values.password);

    if(result.code !== 403){
      navigate(PATH_LIST.HOME);
    }
    setAuth(result);
    localStorage.setItem('accessToken',result.accessToken)
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
  const logValues = {loginSubmitHandler,registerSubmitHandler,username:auth.username,password:auth.password,email:auth.email,isAuthenticated: !!auth.email,token: auth.accessToken,logoutHandler}

  return (
    <AuthContext.Provider value={logValues}>


    <div id="box">
      <Header />
      <Routes>
                <Route path={PATH_LIST.HOME} element={<Home />} />
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/game-details/:id" element={<Details />}></Route>
                <Route path="/game-edit/:id" element={<Edit />}></Route>
                <Route path="/games" element={<Catalogue />}></Route>
                <Route path="*" element={<Home />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </div>
    </AuthContext.Provider>

  )
}

export default App
