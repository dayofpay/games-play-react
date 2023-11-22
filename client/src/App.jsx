
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Catalogue from "./components/game-catalogue/Catalogue"
import Edit from "./components/game-edit/Edit"
import Details from "./components/games-details/Details"
import Home from "./components/games-home/Home"
import Header from "./components/header/Header"
import { Routes , Route } from "react-router-dom"
function App() {


  return (
    <>
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
    </>
  )
}

export default App
