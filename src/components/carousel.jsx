"use client";

import { Carousel } from "flowbite-react";

function carousel({ images }) {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
                {images.map((image, index) => (
                    <div key={index}>
                        <img  src={`https://api.akayamedia.com/content/${image.image}`} alt={image.alt} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default carousel