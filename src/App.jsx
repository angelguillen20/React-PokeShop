import Header from "./components/Header";
import Pokeballs from "./components/Pokeballs";
import Home from './pages/Home';
import Potion from "./components/Potion";

import { Routes, Route } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { db_Pokeballs } from "./data/db_Pokeballs";
import { db_Potions } from "./data/db_Potions";
import Footer from "./components/Footer";

function PokeballsPage({addToCart}) {
  return (
    <main className="container mt-5 pt-5">
      <h1>Pokeballs</h1>
      <hr />
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {db_Pokeballs.map((pokeball) => (
          <Pokeballs key={pokeball.id} pokeballs={pokeball} addToCart={addToCart} />
        ))}
      </div>
    </main>
  );
}

function PotionsPage({addToCart}) {
  return (
    <main className="container mt-5 pt-5">
      <h1 >Potions</h1>
      <hr />
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {db_Potions.map((potions) => (
          <Potion key={potions.id} potions={potions} addToCart = {addToCart} />
        ))}
      </div>
    </main>
  );
}




function App() {
  const {data,cart ,addToCart,removeFromCart,decreaseQuantity,increaseQuantity,clearCart,isEmpty,cartTotal} = useCart();

  return (
    <>
      <Header 
        cart={cart}
        isEmpty={isEmpty}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        cartTotal={cartTotal}
        addToCart={addToCart}
      />  


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokeballs" element={<PokeballsPage data addToCart={addToCart}/>} />
        <Route path="/potions" element={<PotionsPage data addToCart={addToCart}/>} />
      </Routes>

      <Footer />
    </>

  );
}

export default App;
