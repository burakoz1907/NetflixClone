"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabaseClient"; 
import { useAuth } from '@clerk/nextjs'; 
import styles from "./card.module.css";
import StarRating from "@/app/components/star"; 

const MoviePage = ({ params }) => {
  const { id } = params;
  const { userId } = useAuth(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(() => {
  const savedRating = localStorage.getItem(`rating_${id}`);
  return savedRating ? Number(savedRating) : null; // Kaydedilmiş puan varsa, onu yükle
  });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = '87eb117002b0f10ae6dfdfae4e452326';
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId)
        .eq('movie_id', id);

      if (error) {
        console.error('Error checking favorite status:', error);
      } else if (data.length > 0) {
        setIsFavorite(true);
      }
    };

    checkIfFavorite();
  }, [id, userId]);

  const handleAddToFavorites = async () => {
    try {
      if (!userId || isFavorite) {
        return; // Kullanıcı giriş yapmamışsa veya zaten favoriyse, hiçbir şey yapma
      }

      const { data, error } = await supabase
        .from('favorites')
        .insert([{
          user_id: userId,
          movie_id: id,
          title: movie.title,
          poster_path: movie.poster_path,
        }]);

      if (error) {
        console.error('Error adding to favorites:', error);
      } else {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    // Puanı localStorage'a kaydet
    localStorage.setItem(`rating_${id}`, newRating);
  };

  if (loading) return <div>Loading...</div>;

  if (!movie) return <div>Film bulunamadı.</div>;

  return (
    <div className={styles.card}>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
      ) : (
        <p>Poster mevcut değil</p>
      )}
      <div className={styles.details}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.overview}>{movie.overview}</p>
        <p><strong>Çıkış Tarihi:</strong> {movie.release_date}</p>
        <p><strong>Değerlendirme:</strong> {movie.vote_average} / 10</p>
        <p><strong>Süre:</strong> {movie.runtime} dakika</p>
        {movie.genres && movie.genres.length > 0 && (
          <p>
            <strong>Türler:</strong> {movie.genres.map(genre => genre.name).join(', ')}
          </p>
        )}

        <div className={styles.favoriteContainer}>
          <button
            onClick={handleAddToFavorites}
            disabled={isFavorite}
            className={styles.favoriteButton}
          >
            {isFavorite ? 'Favorilere Eklendi' : 'Favorilere Ekle'}
          </button>
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
