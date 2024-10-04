import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>
          Bu proje bir Netflix klonudur. Orijinal Netflix platformu ile hiçbir bağlantısı yoktur ve ticari bir amaç taşımamaktadır. 
          Bu uygulama yalnızca eğitim ve öğrenme amaçlı geliştirilmiştir.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#141414', // Netflix'in koyu renkli tarzına uygun
    padding: '20px 0',
    position: 'relative',
    bottom: '0',
    width: '100%',
    textAlign: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  text: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: '1.6',
  }
};

export default Footer;
