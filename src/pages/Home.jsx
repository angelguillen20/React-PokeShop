import ControlledCarousel from "../components/ControllCarusel";
import { Link } from "react-router-dom";
import VideoUser from "../components/VideoUser";

export default function Home() {
    return (
        <>

            <div className="container mt-3 ">
                <ControlledCarousel />
                <br />
                <div className="row mb-4">
                    <br />
                    <h2>PRODUCTOS</h2>
                    <hr />
                </div>
                <h3 className="mb-3">Medicinas</h3>
                    <Link to="/potions">
                        <div className="row row-cols-5 row-cols-md-4 g-2 text-center "> 
                            <img src="/img/medicineImages/00potion.png" alt="" />
                            <img src="/img/medicineImages/01superpotion.png" alt="" />
                            <img src="/img/medicineImages/02hiperpotion.png" alt="" />
                            <img src="/img/medicineImages/03revivir.png" alt="" />
                        </div>
                    </Link>
                <br />
                <h3 className="mb-3">Pokéballs</h3>
                    <Link to="/pokeballs">
                        <div className="row row-cols-5 row-cols-md-4 g-2 text-center "> 
                        <img src="/img/pokeballsImages/00pokéball.png" alt="" />
                        <img src="/img/pokeballsImages/01honorball.png" alt="" />
                        <img src="/img/pokeballsImages/03ultraball.png" alt="" />
                        <img src="/img/pokeballsImages/04masterball.png" alt="" />
                        </div>
                    </Link>
                <br />
                <h3 className="mb-3">video publicidad</h3>
                <hr />
                <VideoUser />
            </div>
        </>
    );
}

