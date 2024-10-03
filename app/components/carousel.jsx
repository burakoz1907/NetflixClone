"use client";

import React, { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import styles from './carousel.module.css'; 

const Carousel = ({ movies = [] }) => {
  const [sliderRef, sliderInstanceRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: 8,
      spacing: 15,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      '(max-width: 480px)': {
        slides: {
          perView: 1,
          spacing: 5,
        },
      },
    },
  });
  const router = useRouter();

  const handleMovieClick = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  useEffect(() => {
    if (sliderInstanceRef.current) {
      sliderInstanceRef.current.update();
    }
  }, [movies, sliderInstanceRef]); 

  return (
    <div ref={sliderRef} className={`keen-slider ${styles.keenSlider}`}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className={`keen-slider__slide ${styles.keenSliderSlide}`} onClick={() => handleMovieClick(movie.id)}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              layout="responsive"
              width={500}
              height={750}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))
      ) : (
        <div>Film Bulunamadı</div>
      )}
    </div>
  );
};

export default Carousel;