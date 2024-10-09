"use client";

import { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export default function HomeHeaderSwiper() {
    useEffect(() => {
        // Initialize Swiper
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
        
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true, // Optional: Makes pagination clickable
            },
        
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        
        });

        // Cleanup function to destroy Swiper on component unmount
        return () => {
            swiper.destroy();
        };
    }, []); // Empty dependency array to run once on mount

    return (
        <div className="swiper h-[40vh]">
            <div className="object-cover swiper-wrapper">
                <div className="swiper-slide">
                    <img src="https://placehold.co/2100x400/webp" className="w-full h-full" alt="" />
                </div>
                <div className="swiper-slide">
                    <img src="https://placehold.co/2100x400/webp" className="w-full h-full" alt="" />
                </div>
                <div className="swiper-slide">
                    <img src="https://placehold.co/2100x400/webp" className="w-full h-full" alt="" />
                </div>
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </div>
    );
}
