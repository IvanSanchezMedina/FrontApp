import React, { useRef } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function blocks({ blocks }) {
    let sliderRef = useRef(null);
    const play = () => {
        sliderRef.slickPlay();
    };
    const pause = () => {
        sliderRef.slickPause();
    };

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        nextArrow: false,
        prevArrow: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3.5
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 3
                }
            },
        ]
    };
    return (
        <div>
            {blocks.map((block, index) => (
                <div key={index}>
                    {block.type == 3 || block.type == 6 ?
                        <>
                            <div className='mb-10 mt-10 titleBlock redLine text-slate-800'>
                                {block.name}
                            </div>

                            <div className="slider-container">
                                <Slider ref={slider => (sliderRef = slider)} {...settings}>
                                    {block.series && (
                                        block.series.map((serie, serieIndex) => (
                                            <div className="blockContainer pr-3 pl-3 md:pr-3 md:pl-3 sm:pr-2 sm:pl-2" key={serieIndex}>
                                                <img className="imageBlock" src={`https://api.akayamedia.com/content/${serie.image}`} alt={serie.name} />
                                            </div>
                                        ))
                                    )}
                                </Slider>
                            </div>
                        </>
                        :
                        <>
                            {block.type == 4
                                ?
                                <>
                                    <div className='mb-10 mt-10 titleBlock redLine text-slate-800'>
                                        {block.name}
                                    </div>
                                    <img src={`${block.img1}`} />
                                </>

                                :
                                <>
                                    <div className=' md:text-blue-600  sm:text-red-600 mb-10 mt-10 titleBlock redLine text-slate-800'>
                                        {block.name}
                                    </div>
                                    <div class="md:flex">
                                        <div class="md:w-1/2  md:mr-3 md:mb-0 sm:mb-3 mb-3">
                                            <img src={`${block.img1}`} />
                                        </div>
                                        <div class="md:w-1/2 md:ml-3  md:mt-0 sm:mt-3 mt-3">
                                            <img src={`${block.img2}`} />
                                        </div>
                                    </div>
                                </>
                            }
                        </>


                    }

                </div>
            ))}
        </div>



    )
}

export default blocks