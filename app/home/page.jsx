"use client";

import React, { useEffect, useState } from 'react';
import Carousel from '../components/carousel';
import { useRouter } from "next/navigation";
import { useAuth } from '@clerk/nextjs';
import './home.css';

export default function Page() {
  const { isSignedIn } = useAuth(); 
  const router = useRouter(); 

  const [popularMovies, setPopularMovies] = useState([]);
  const [turkishMovies, setTurkishMovies] = useState([]);
  const [awardWinningShows, setAwardWinningShows] = useState([]);
  const [sciFiMovies, setSciFiMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const apiKey = '87eb117002b0f10ae6dfdfae4e452326';

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-up');
    }
  }, [isSignedIn, router]);

  // fetch ile verileri çekme
  useEffect(() => {
    const fetchPopularMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPopularMovies(data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const fetchTurkishMovies = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=tr-TR&with_original_language=tr`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTurkishMovies(data.results);
      } catch (error) {
        console.error('Error fetching Turkish movies:', error);
      }
    };

    fetchTurkishMovies();
  }, []);

  useEffect(() => {
    const fetchAwardWinningShows = async () => {
      const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=vote_average.desc&page=1&vote_count.gte=1000`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setAwardWinningShows(data.results);
      } catch (error) {
        console.error('Error fetching award-winning shows:', error);
      }
    };

    fetchAwardWinningShows();
  }, []);

  useEffect(() => {
    const fetchSciFiMovies = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=878&language=en-US`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setSciFiMovies(data.results);
      } catch (error) {
        console.error('Error fetching Sci-Fi movies:', error);
      }
    };

    fetchSciFiMovies();
  }, []);

  useEffect(() => {
    const fetchHorrorMovies = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&language=en-US`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setHorrorMovies(data.results);
      } catch (error) {
        console.error('Error fetching horror movies:', error);
      }
    };

    fetchHorrorMovies();
  }, []);

  useEffect(() => {
    const fetchRomanceMovies = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749&language=en-US`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setRomanceMovies(data.results);
      } catch (error) {
        console.error('Error fetching romance movies:', error);
      }
    };

    fetchRomanceMovies();
  }, []);

  useEffect(() => {
    const fetchActionMovies = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&language=en-US`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setActionMovies(data.results);
      } catch (error) {
        console.error('Error fetching action movies:', error);
      }
    };

    fetchActionMovies();
  }, []);

  useEffect(() => {
    const fetchNetflixOriginals = async () => {
      const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_networks=213&language=en-US`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setNetflixOriginals(data.results);
      } catch (error) {
        console.error('Error fetching Netflix originals:', error);
      }
    };

    fetchNetflixOriginals();
  }, []);
  // veri çekme işlemi bitti

  return (
    <div className='containerMovie'> 
      <h3>Sıradaki Önerimiz</h3>
      <Carousel movies={popularMovies}/>

      <h3>Türk Yapımı</h3>
      <Carousel movies={turkishMovies}/>

      <h3>Ödüllü Diziler</h3>
      <Carousel movies={awardWinningShows}/>

      <h3>Bilim Kurgu</h3>
      <Carousel movies={sciFiMovies}/>

      <h3>Korku ve Gerilim</h3>
      <Carousel movies={horrorMovies}/>

      <h3>Aşk Dolu Filmler</h3>
      <Carousel movies={romanceMovies}/>

      <h3>Aksiyon ve Macera</h3>
      <Carousel movies={actionMovies}/>
    </div>
  );
}
