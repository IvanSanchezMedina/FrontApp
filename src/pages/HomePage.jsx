
import { getHomeSlideRequest } from '../api/home';
import Carousel from '../components/carousel'
import { useEffect, useState, } from "react"
import { useTranslation } from "react-i18next";

function HomePage() {
    const [images, setImages] = useState([]);
    const [t, i18n] = useTranslation("global");
    const languageData = i18n.language;

    const getHomeSlides = async (language) => {
        try {
            const slides = await getHomeSlideRequest(language);

            setImages(slides.data);
        } catch (error) {
            console.error('Error fetching home slides:', error);
            // Manejar el error según sea necesario
        }
    };

    useEffect(() => {
        // Obtener los slides al montar el componente
        getHomeSlides(languageData);
    }, [languageData]); // Ejecutar el efecto cuando languageData cambie

    // También puedes usar useEffect para realizar la petición inicial
    useEffect(() => {
        getHomeSlides(languageData);
    }, []); // Esto se ejecutará solo una vez al montar el componente


    return (
        <div className="">
            <Carousel images={images} /> 
        </div>
    )
}

export default HomePage;