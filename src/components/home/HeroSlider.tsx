'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const sliderImages = [
    {
        src: "https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_06.jpg?alt=media&token=b317a006-5cfb-4591-83fb-6f0a2f61f80b",
        alt: "Creative background with a person looking at an art installation",
        dataAiHint: "creative background art"
    },
    {
        src: "https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9",
        alt: "A professional videographer filming an event",
        dataAiHint: "event videography professional"
    },
    {
        src: "https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4",
        alt: "Abstract blurred background of a waterfront",
        dataAiHint: "abstract water background"
    }
];

export function HeroSlider() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {sliderImages.map((image, index) => (
                    <CarouselItem key={index} className="h-[60vh] md:h-[80vh] relative">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            data-ai-hint={image.dataAiHint}
                            sizes="100vw"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
