
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
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
      </Routes>
    </div>
    </>
  )
}

export default App
