import React, { useRef } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Blocks({ blocks }) {
    let sliderRef = useRef(null);

    const play = () => {
        sliderRef.current.slickPlay();
    };
    const pause = () => {
        sliderRef.current.slickPause();
    };

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        nextArrow: false,
        prevArrow: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4
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
                    slidesToShow: 4
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
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2
                }
            },
        ]
    };

    return (
        <div>
            {blocks.map((block, index) => {
                console.log(`Block #${index}:`, block, block.type);

                return (
                    <div key={index}>
                        {(block.type == 3 || block.type == 6 || block.type == 2) && (
                            <>
                                <div className='py-4 titleBlock text-slate-800 dark:text-white'>
                                    {block.name}
                                </div>

                                <div className="slider-container">
                                    <Slider ref={sliderRef} {...settings}>
                                        {block.series && block.series.map((serie, serieIndex) => (
                                            <div key={serieIndex} className="py-10 rounded-sm">

                                                <div className="card w-11/12 h-[600px] rounded-sm relative bg-gray-100 text-gray-800 overflow-hidden leading-[150%] transition-shadow duration-300 ease-in-out">
                                                    <div className="card-img  absolute h-full w-full  transition-transform duration-300 ease-in-out "
                                                        style={{ backgroundImage: `url('https://api.akayamedia.com/content/${serie.image}')`, backgroundSize: 'cover', backgroundPosition: 'center center' }}
                                                    >
                                                    </div>

                                                    <ul className="social-media rounded-sm absolute bottom-0 flex justify-between w-full px-4 transform -translate-y-24 z-30">
                                                        <li className="bg-gray-100 inline-flex p-2 rounded-full cursor-pointer opacity-0 transition-all duration-300 ease-in">
                                                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                                                            </svg>

                                                        </li>
                                                        <li className="bg-gray-100 inline-flex p-2 rounded-full cursor-pointer opacity-0 transition-all duration-300 ease-in">
                                                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z" />
                                                            </svg>

                                                            {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" className="icon">
                                                                <path d="M123.52064 667.99143l344.526782 229.708899 0-205.136409-190.802457-127.396658zM88.051421 585.717469l110.283674-73.717469-110.283674-73.717469 0 147.434938zM556.025711 897.627196l344.526782-229.708899-153.724325-102.824168-190.802457 127.396658 0 205.136409zM512 615.994287l155.406371-103.994287-155.406371-103.994287-155.406371 103.994287zM277.171833 458.832738l190.802457-127.396658 0-205.136409-344.526782 229.708899zM825.664905 512l110.283674 73.717469 0-147.434938zM746.828167 458.832738l153.724325-102.824168-344.526782-229.708899 0 205.136409zM1023.926868 356.00857l0 311.98286q0 23.402371-19.453221 36.566205l-467.901157 311.98286q-11.993715 7.459506-24.57249 7.459506t-24.57249-7.459506l-467.901157-311.98286q-19.453221-13.163834-19.453221-36.566205l0-311.98286q0-23.402371 19.453221-36.566205l467.901157-311.98286q11.993715-7.459506 24.57249-7.459506t24.57249 7.459506l467.901157 311.98286q19.453221 13.163834 19.453221 36.566205z"></path>
                                                            </svg> */}
                                                        </li>
                                                        <li className="bg-gray-100 inline-flex p-2 rounded-full cursor-pointer opacity-0 transition-all duration-300 ease-in">
                                                            {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" className="icon">
                                                                <path d="M950.930286 512q0 143.433143-83.748571 257.974857t-216.283429 158.573714q-15.433143 2.852571-22.601143-4.022857t-7.168-17.115429l0-120.539429q0-55.442286-29.696-81.115429 32.548571-3.437714 58.587429-10.313143t53.686857-22.308571 46.299429-38.034286 30.281143-59.977143 11.702857-86.016q0-69.12-45.129143-117.686857 21.138286-52.004571-4.534857-116.589714-16.018286-5.12-46.299429 6.290286t-52.589714 25.161143l-21.723429 13.677714q-53.174857-14.848-109.714286-14.848t-109.714286 14.848q-9.142857-6.290286-24.283429-15.433143t-47.689143-22.016-49.152-7.68q-25.161143 64.585143-4.022857 116.589714-45.129143 48.566857-45.129143 117.686857 0 48.566857 11.702857 85.723429t29.988571 59.977143 46.006857 38.253714 53.686857 22.308571 58.587429 10.313143q-22.820571 20.553143-28.013714 58.88-11.995429 5.705143-25.746286 8.557714t-32.548571 2.852571-37.449143-12.288-31.744-35.693714q-10.825143-18.285714-27.721143-29.696t-28.306286-13.677714l-11.410286-1.682286q-11.995429 0-16.603429 2.56t-2.852571 6.582857 5.12 7.972571 7.460571 6.875429l4.022857 2.852571q12.580571 5.705143 24.868571 21.723429t17.993143 29.110857l5.705143 13.165714q7.460571 21.723429 25.161143 35.108571t38.253714 17.115429 39.716571 4.022857 31.744-1.974857l13.165714-2.267429q0 21.723429 0.292571 50.834286t0.292571 30.866286q0 10.313143-7.460571 17.115429t-22.820571 4.022857q-132.534857-44.032-216.283429-158.573714t-83.748571-257.974857q0-119.442286 58.88-220.306286t159.744-159.744 220.306286-58.88 220.306286 58.88 159.744 159.744 58.88 220.306286z"></path>
                                                            </svg> */}
                                                            <svg class="w-[44px] h-[44px] text-gray-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                <path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd" />
                                                            </svg>

                                                        </li>
                                                    </ul>
                                                    <div className="card-info rounded-sm absolute bottom-4 w-full text-center">
                                                        <p className="title truncate">{serie.name}</p>
                                                        <p className="subtitle truncate">{serie.credits}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </>
                        )}
                        {(block.type == 5) && (
                            <>
                                <div className='mb-10 mt-10 titleBlock redLine text-slate-800 dark:text-white '>
                                    {block.name}
                                </div>
                                <div className="md:flex">
                                    <div className="md:w-1/2 md:mr-3 md:mb-0 sm:mb-3 mb-3 ">
                                        <img className="rounded-md" src={`${block.img1}`} alt="" />
                                    </div>
                                    <div className="md:w-1/2 md:ml-3 md:mt-0 sm:mt-3 mt-3">
                                        <img className="rounded-md" src={`${block.img2}`} alt="" />
                                    </div>
                                </div>

                            </>
                        )}
                        {block.type == 4 && (
                            <>
                                <div className='mb-10 mt-10 titleBlock redLine text-slate-800 dark:text-white'>
                                    {block.name}
                                </div>
                                <img className="rounded-md" src={`${block.img1}`} alt="" />

                            </>

                        )}



                    </div>
                );
            })}
        </div>
    );
}

export default Blocks;
