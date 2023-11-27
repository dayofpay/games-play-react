
import { Routes , Route } from "react-router-dom"


import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Logout from "./components/Auth/Logout"

import Catalogue from "./components/game-catalogue/Catalogue"
import Edit from "./components/game-edit/Edit"
import Details from "./components/games-details/Details"
import Home from "./components/games-home/Home"

import Header from "./components/header/Header"

import { AuthProvider } from "./contexts/authContext"

import PATH_LIST from "./paths"
import Create from "./game-create/Create"

function App() {
  

  return (
    <AuthProvider>


    <div id="box">
      <Header />
      <Routes>
                <Route path={PATH_LIST.HOME} element={<Home />} />
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/game-details/:id" element={<Details />}></Route>
                <Route path="/game-edit/:id" element={<Edit />}></Route>
                <Route path="/game-create" element={<Create />}></Route>
                <Route path="/games" element={<Catalogue />}></Route>
                <Route path="*" element={<Home />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </div>
    </AuthProvider>

  )
}

export default App
