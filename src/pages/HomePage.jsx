
import { getHomeSlideRequest, getHomeBlocksRequest } from '../api/home';
import Slide from '../components/slide'
import { useEffect, useState, } from "react"
import { useTranslation } from "react-i18next";
import { Carousel } from "flowbite-react";
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
            console.log(blocksRes)
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

            {blocks.map((block, index) => (
                <div key={index}>
                    <h2>{block.name}</h2>
                    {block.series && (
                        <div>
                            <div className="grid h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96">
                                <Carousel >
                                    {block.series.map((serie, serieIndex) => (
                                        <div key={serieIndex}>

                                            <img src={`https://api.akayamedia.com/content/${serie.image}`} alt={serie.name} />

                                        </div>
                                    ))}
                                </Carousel>
                   
                                <Carousel >
                                    {block.series.map((serie, serieIndex) => (
                                        <div key={serieIndex + halfLength}>

                                            <img src={`https://api.akayamedia.com/content/${serie.image}`} alt={serie.name} />

                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Segundo map para la segunda mitad de los bloques */}
            {/* {blocks.slice(halfLength).map((block, index) => (
                <div key={index + halfLength}>
                    <h2>{block.name}</h2>
                    {block.series && (
                        <div>
                            {block.series.map((serie, serieIndex) => (
                                <div key={serieIndex}>
                                    <div className="grid h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96">
                                        <Carousel>
                                            <img src={`https://api.akayamedia.com/content/${serie.image}`} alt={serie.name} />
                                        </Carousel>
                                        <Carousel indicators={false}>
                                            <img src={`https://api.akayamedia.com/content/${serie.image}`} alt={serie.name} />
                                        </Carousel>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))} */}
            {/* <div className="grid h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                </Carousel>
                <Carousel indicators={false}>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                </Carousel>
            </div> */}

        </div>

    )
}

export default HomePage;