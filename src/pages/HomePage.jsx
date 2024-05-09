
import { getHomeSlideRequest, getHomeBlocksRequest } from '../api/home';
import Slide from '../components/slide'
import { useEffect, useState, } from "react"
import { useTranslation } from "react-i18next";
import Blocks from '../components/blocks';

function HomePage() {
    const [images, setImages] = useState([]);
    const [blocks, setBlocks] = useState([]);
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

    const getHomeBlocks = async (language) => {
        try {
            const blocksRes = await getHomeBlocksRequest(language);
            setBlocks(blocksRes.data);
        } catch (error) {
            console.error('Error fetching home blocks:', error);
            // Manejar el error según sea necesario
        }
    };

    useEffect(() => {
        // Obtener los slides al montar el componente
        getHomeSlides(languageData);
        getHomeBlocks(languageData);
    }, [languageData]); // Ejecutar el efecto cuando languageData cambie

    // También puedes usar useEffect para realizar la petición inicial
    useEffect(() => {
        getHomeSlides(languageData);
        getHomeBlocks(languageData);
    }, []); // Esto se ejecutará solo una vez al montar el componente

    const halfLength = Math.ceil(blocks.length / 2); // Calcula la mitad de la longitud de la matriz de bloques

    return (
        <div className="">
            <Slide images={images} />

            <Blocks blocks= {blocks}/>

        </div>

    )
}

export default HomePage;