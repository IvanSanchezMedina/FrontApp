"use client";

import { Carousel } from "flowbite-react";

function slide({ images }) {
    return (
        <div className="sm:h-64 xl:h-80 2xl:h-96">
            <Carousel className="pt-9">
                {images.map((image, index) => (
                    <div key={index}>
                        <img className="rounded w-full h-full" src={`https://api.akayamedia.com/content/${image.image}`} alt={image.alt} />
                    </div> 
                ))}
            </Carousel>
        </div>
    )
}

export default slide