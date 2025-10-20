import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/ControlledCarousel.css';
import { Link } from 'react-router-dom';
export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="carousel-container">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <Link to="/potions"> 
                    <img
                        className="d-block w-100"
                        src="/img/Carrusel/carrouselMedicine.png"
                        alt="Pokeballs"
                    />
                    </Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to="/pokeballs">
                    <img
                        className="d-block w-100"
                        src="/img/Carrusel/carrouselPokéballs.png"
                        alt="Medicine"
                    />
                    </Link>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
