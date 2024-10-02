"use client"

import React, { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRouter } from "next/navigation";


const Carousel = ({ movies = [] }) => {
  const [sliderRef, sliderInstanceRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: 8,
      spacing: 15,
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
    <div ref={sliderRef} className="keen-slider">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className="keen-slider__slide" onClick={() => handleMovieClick(movie.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
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
