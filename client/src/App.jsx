
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
      </Routes>
    </div>
    </>
  )
}

export default App
