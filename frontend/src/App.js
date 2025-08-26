import { Route, Router, BrowserRouter, Routes } from "react-router-dom";

// import pages
import Home from "./pages/Home";
import AllSuperheroes from "./pages/AllSuperheroes";
import Superhero from "./pages/Superhero";
import About from "./pages/About";

// import components
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/superheroes" element={ <AllSuperheroes />} />
        <Route path="/superheroes/:superheroId" element={ <Superhero /> } />
        <Route path="/about" element={ <About /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;