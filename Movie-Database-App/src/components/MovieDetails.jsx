import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const API_URL = `http://www.omdbapi.com/?apikey=dbf578a4&i=${id}`;
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Erreur:", error));
  }, [id]);

  if (!movie) return <div>Chargement...</div>;

  const styles = {
    container: {
      backgroundColor: "rgba(211, 47, 47, 0.65)", 
      padding: "40px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      textAlign: "center",
      color: "black", 
      fontSize: "2.5em",
      marginBottom: "20px",
      fontWeight: "bold", 
    },
    content: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "center",
      gap: "40px",
      maxWidth: "1200px",
      margin: "auto",
    },
    poster: {
      width: "300px",
      borderRadius: "10px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    },
    posterHover: {
      transform: "rotateY(10deg) rotateX(10deg) scale(1.05)", // Effet 3D
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
    },
    description: {
      color: "black", 
      fontSize: "1.2em",
      lineHeight: "1.6",
      maxWidth: "600px",
      fontWeight: "bold", 
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{movie.Title}</h1>
      <div style={styles.content}>
        <div
          style={{ perspective: "1000px" }}
          onMouseEnter={(e) => {
            e.currentTarget.querySelector("img").style.transform =
              styles.posterHover.transform;
            e.currentTarget.querySelector("img").style.boxShadow =
              styles.posterHover.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector("img").style.transform = "";
            e.currentTarget.querySelector("img").style.boxShadow = "";
          }}
        >
          <img
            src={movie.Poster}
            alt={movie.Title}
            style={styles.poster}
          />
        </div>
        <p style={styles.description}>{movie.Plot}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
