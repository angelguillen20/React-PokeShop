import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/ControlledCarousel.css';
export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="carousel-container">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/img/Carrusel/carrouselMedicine.png"
                        alt="Pokeballs"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/img/Carrusel/carrouselPokéballs.png"
                        alt="Medicine"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
