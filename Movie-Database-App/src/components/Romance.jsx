import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Romance = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = "dbf578a4";

  useEffect(() => {
    const fetchRomanceMovies = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=romance&type=movie`
        );
        const data = await response.json();
        setMovies(data.Search || []);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des films de romance:",
          error
        );
      }
    };
    fetchRomanceMovies();
  }, []);

  if (loading) return <div>Chargement des films Romance...</div>;

  const styles = {
    container: {
      backgroundColor: "rgba(245, 245, 245, 1)", 
      padding: "20px",
      minHeight: "100vh",
    },
    title: {
      textAlign: "center",
      color: "rgba(211, 47, 47, 1)", 
      fontSize: "2.5em",
      marginBottom: "20px",
      fontWeight: "bold",
    },
    movieGrid: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: "20px",
      overflowX: "auto", 
      padding: "10px 0",
    },
    movieItem: {
      flex: "0 0 auto", 
      width: "200px",
      textAlign: "center",
    },
    poster: {
      width: "100%",
      borderRadius: "10px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    },
    posterHover: {
      transform: "scale(1.05)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
    },
    titleText: {
      marginTop: "10px",
      fontWeight: "bold",
      color: "black", 
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Films Romance</h2>
      <div style={styles.movieGrid}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={styles.movieItem}>
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
              <Link to={`/movie/${movie.imdbID}`}>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  style={styles.poster}
                />
              </Link>
            </div>
            <p style={styles.titleText}>{movie.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Romance;
