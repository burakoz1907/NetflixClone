"use client";

import React, { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRouter } from "next/navigation";
import Image from 'next/image'; // next/image bileşenini içe aktar

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
  }, [movies, sliderInstanceRef]); // sliderInstanceRef'i ekledik

  return (
    <div ref={sliderRef} className="keen-slider">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className="keen-slider__slide" onClick={() => handleMovieClick(movie.id)}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              layout="responsive" // Resmi orantılı olarak boyutlandırır
              width={500} // Genişlik
              height={750} // Yükseklik
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