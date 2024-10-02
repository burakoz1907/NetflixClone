import React from 'react';
import "../homepage/homepage.css";

export default function Homepage() {
  return (
    <div className="homepage-container">
      <div className="background-image">
        <div className="overlay">
          <h1>Sınırsız film, dizi ve çok daha fazlası</h1>
          <p>149,99 TL ile başlayan fiyatlarla. İstediğiniz zaman iptal edebilirsiniz.</p>
          <div className='input-container'>
            <input type="email" placeholder="E-posta adresi" className="email-input" />
            <button className="start-button">Başlayın</button>
          </div>
        </div>
      </div>
    </div>
  );
}
