import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const HomePage = ({ searchResults, errorMessage }) => {
  const [movies, setMovies] = useState({
    popular: [],
    animation: [],
    romance: [],
    adult: [],
  });
  const [loading, setLoading] = useState(true);

  const API_KEY = "dbf578a4";

  const fetchMoviesByCategory = async (query) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`
      );
      const data = await response.json();
      return data.Search ? data.Search.slice(0, 5) : [];
    } catch (error) {
      console.error("Movie recovery error:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      const [popular, animation, romance, adult] = await Promise.all([
        fetchMoviesByCategory("avengers"),
        fetchMoviesByCategory("animation"),
        fetchMoviesByCategory("romance"),
        fetchMoviesByCategory("thriller"),
      ]);
      setMovies({ popular, animation, romance, adult });
      setLoading(false);
    };

    fetchAllMovies();
  }, []);

  if (loading) return <div>Loading movies...</div>;

  const styles = {
    page: {
      backgroundColor: "#f4f4f4",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    section: {
      marginBottom: "30px",
      backgroundColor: "#d32f2f",
      borderRadius: "8px",
      padding: "10px",
      color: "white",
    },
    sectionTitle: {
      margin: "0 0 10px",
      fontSize: "1.5em",
      borderBottom: "2px solid white",
      paddingBottom: "5px",
    },
    movieGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "15px",
    },
    movieItem: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      perspective: "1000px", 
    },
    moviePoster: {
      width: "100%",
      borderRadius: "8px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    },
    moviePosterHover: {
      transform: "rotateY(10deg) rotateX(10deg) scale(1.1)", 
      boxShadow: "0 15px 25px rgba(0, 0, 0, 0.5)", 
    },
    movieTitle: {
      marginTop: "10px",
      fontSize: "1em",
      fontWeight: "bold",
      color: "#000",
    },
    errorMessage: {
      color: "red",
      textAlign: "center",
      marginTop: "20px",
    },
    // Responsive styles
    '@media (max-width: 768px)': {
      page: {
        padding: "10px",
      },
      section: {
        padding: "5px",
      },
      sectionTitle: {
        fontSize: "1.2em",
      },
      movieGrid: {
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: "10px",
      },
      moviePoster: {
        borderRadius: "5px",
      },
      movieTitle: {
        fontSize: "0.9em",
      },
    },
    '@media (max-width: 480px)': {
      sectionTitle: {
        fontSize: "1em",
      },
      movieGrid: {
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        gap: "8px",
      },
      movieTitle: {
        fontSize: "0.8em",
      },
    },
  };
  

  return (
    <div style={styles.page}>
      <h1>Welcome to MovieDb</h1>

      {errorMessage ? (
        <p style={styles.errorMessage}>{errorMessage}</p>
      ) : searchResults.length > 0 ? (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Search results</h2>
          <div style={styles.movieGrid}>
            {searchResults.map((movie) => (
              <div
                key={movie.imdbID}
                style={styles.movieItem}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector("img").style.transform =
                    styles.moviePosterHover.transform;
                  e.currentTarget.querySelector("img").style.boxShadow =
                    styles.moviePosterHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector("img").style.transform = "";
                  e.currentTarget.querySelector("img").style.boxShadow = "";
                }}
              >
                <Link to={`/movie/${movie.imdbID}`}>
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/150"
                    }
                    alt={movie.Title}
                    style={styles.moviePoster}
                  />
                  <p style={styles.movieTitle}>{movie.Title}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p style={styles.errorMessage}>Do a search and find the results here.</p>
      )}

      {/* Sections for categories */}
      {["popular", "animation", "romance", "adult"].map(
        (category) =>
          movies[category].length > 0 && (
            <section key={category} style={styles.section}>
              <h2 style={styles.sectionTitle}>
                {category === "popular"
                  ? "Popular Movies"
                  : category === "animation"
                  ? "Animated Films"
                  : category === "romance"
                  ? "Romance Movies"
                  : "Adult Movies"}
              </h2>
              <div style={styles.movieGrid}>
                {movies[category].map((movie) => (
                  <div
                    key={movie.imdbID}
                    style={styles.movieItem}
                    onMouseEnter={(e) => {
                      e.currentTarget.querySelector("img").style.transform =
                        styles.moviePosterHover.transform;
                      e.currentTarget.querySelector("img").style.boxShadow =
                        styles.moviePosterHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.querySelector("img").style.transform = "";
                      e.currentTarget.querySelector("img").style.boxShadow = "";
                    }}
                  >
                    <Link to={`/movie/${movie.imdbID}`}>
                      <img
                        src={
                          movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/150"
                        }
                        alt={movie.Title}
                        style={styles.moviePoster}
                      />
                      <p style={styles.movieTitle}>{movie.Title}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )
      )}
    </div>
  );
};

HomePage.propTypes = {
  searchResults: PropTypes.array.isRequired,
  errorMessage: PropTypes.string,
};

export default HomePage;
