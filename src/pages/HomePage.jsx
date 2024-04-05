
import { getHomeSlideRequest } from '../api/home';
import Carousel from '../components/carousel'
import { useEffect, useState, } from "react"
function HomePage() {

    const [images, setImages] = useState([]);

    const getHomeSlides = async  () =>{
       const slides = await getHomeSlideRequest()
        console.log(slides.data)
        setImages(slides.data);
     }

    useEffect(()=>{
        getHomeSlides();
    },[])
    
    return (
        <div className="">
            <Carousel images={images} /> 
        </div>
    )
}

export default HomePage;