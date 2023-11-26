
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Catalogue from "./components/game-catalogue/Catalogue"
import Edit from "./components/game-edit/Edit"
import Details from "./components/games-details/Details"
import Home from "./components/games-home/Home"
import Header from "./components/header/Header"
import { Routes , Route, useNavigate } from "react-router-dom"
import { useState } from "react"
import AuthContext from "./contexts/authContext"
import * as authService from "./services/authServices"
import PATH_LIST from "./paths"
function App() {
  const navigate = useNavigate();
  const [auth,setAuth] = useState({})

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email,values.password);

    if(result.code !== 403){
      navigate(PATH_LIST.HOME);
    }
    setAuth(result);
    console.log(result);
  }
  return (
    <AuthContext.Provider value={{loginSubmitHandler}}>


    <div id="box">
      <Header />
      <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/game-details/:id" element={<Details />}></Route>
                <Route path="/game-edit/:id" element={<Edit />}></Route>
                <Route path="/games" element={<Catalogue />}></Route>
                <Route path="*" element={<Home />}></Route>
      </Routes>
    </div>
    </AuthContext.Provider>

  )
}

export default App
