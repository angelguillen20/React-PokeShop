import Header  from "./components/Header"
import Pokeballs from "./components/Pokeballs"
import {db} from "./data/db"
import { useState } from "react"

function App(){
  
  const [data, setData] = useState(db)
  return (
    <>
    <Header />
    <main className="container mt-5 pt-5">
      <h2 className="text-center">Pokeballs</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data.map((pokeball) => (
          <Pokeballs
            key={pokeball.id}
            pokeballs={pokeball}/>
        ))}
      </div>
    </main>
    </>
  )
}

export default App
