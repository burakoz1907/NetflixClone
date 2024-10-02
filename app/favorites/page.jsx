"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/supabaseClient'; 
import { useAuth } from '@clerk/nextjs'; 
import FavoritesCarousel from '@/app/components/FavoritesCarousel'; 
import { useRouter } from 'next/navigation'; 
import styles from '../favorites/favorites.module.css';

const Favorites = () => {
  const { userId } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching favorites:', error);
      } else {
        setFavorites(data);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.favoritesContainer}>
      <h1>Favoriler</h1>
        <button className={styles.homeButton} onClick={() => router.push('/home')}>
        Anasayfaya Dön
      </button>
      {favorites.length === 0 ? (
        <p>Henüz favori film eklemediniz.</p>
      ) : (
        <div className={styles.carouselWrapper}>
        <FavoritesCarousel movies={favorites} />
        </div>
      )}
    </div>
  );
};

export default Favorites;