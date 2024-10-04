"use client";

import React, { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRouter } from "next/navigation";
import styles from '../favorites/favorites.module.css'; 

const FavoritesCarousel = ({ movies = [] }) => {
  const [sliderRef, sliderInstanceRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: 4, 
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 768px)": { 
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 480px)": { 
        slides: { perView: 1, spacing: 5 }, 
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
  }, [movies]);

  return (
    <div className={styles.carouselContainer}>
      <div ref={sliderRef} className="keen-slider">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.movie_id} className="keen-slider__slide">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles.favoritePoster}
                onClick={() => handleMovieClick(movie.movie_id)}
              />
            </div>
          ))
        ) : (
          <div>Film Bulunamadı</div>
        )}
      </div>
    </div>
  );
};

export default FavoritesCarousel;
