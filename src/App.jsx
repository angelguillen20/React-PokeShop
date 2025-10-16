import Header from "./components/Header";
import Pokeballs from "./components/Pokeballs";
import Home from './pages/Home';
import Potion from "./components/Potion";
import { db_Pokeballs } from "./data/db_Pokeballs";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { db_Potions } from "./data/db_Potions";

function PokeballsPage() {
  const [data, setData] = useState(db_Pokeballs);

  return (
    <main className="container mt-5 pt-5">
      <h2 className="text-center">Pokeballs</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data.map((pokeball) => (
          <Pokeballs key={pokeball.id} pokeballs={pokeball} />
        ))}
      </div>
    </main>
  );
}

function PotionsPage() {
  const [data, setData] = useState(db_Potions);

  return (
    <main className="container mt-5 pt-5">
      <h2 className="text-center">Potions</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data.map((potions) => (
          <Potion key={potions.id} potions={potions} />
        ))}
      </div>
    </main>
  );
}




function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokeballs" element={<PokeballsPage />} />
        <Route path="/potions" element={<PotionsPage />} />
        {/* Aquí podrías añadir más rutas */}
      </Routes>
    </>

  );
}

export default App;
