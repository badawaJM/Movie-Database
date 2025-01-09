import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  // Style objects
  const styles = {
    header: {
      backgroundColor: "#f8f8f8",
      padding: "10px 20px",
      borderBottom: "2px solid #ddd",
      fontFamily: "Arial, sans-serif",
    },
    headerTop: {
      display: "flex",
      alignItems: "center", 
      justifyContent: "space-between", 
      marginBottom: "15px",
    },
    logo: {
      fontSize: "1.8em",
      fontWeight: "bold",
      textDecoration: "none",
      color: "#d32f2f", 
      marginRight: "20px", 
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      maxWidth: "600px",
    },
    searchInput: {
      flex: "1",
      padding: "10px",
      fontSize: "1em",
      border: "1px solid #ccc",
      borderRadius: "4px 0 0 4px",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
    searchInputHover: {
      borderColor: "#d32f2f",
    },
    searchButton: {
      padding: "10px 15px",
      fontSize: "1em",
      border: "none",
      backgroundColor: "#d32f2f",
      color: "white",
      cursor: "pointer",
      borderRadius: "0 4px 4px 0",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    searchButtonHover: {
      backgroundColor: "#ffcccb",
      color: "#b71c1c",
    },
    navBar: {
      display: "flex",
      justifyContent: "space-evenly",
      backgroundColor: "#d32f2f",
      padding: "10px 0",
      borderRadius: "4px",
    },
    navLink: {
      textDecoration: "none",
      color: "white",
      fontSize: "1.2em",
      padding: "10px 20px",
      borderRadius: "4px",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    navLinkHover: {
      backgroundColor: "#ffcccb",
      color: "#b71c1c",
    },
  };

  return (
    <header style={styles.header}>
      {/* Logo and Search Bar Section */}
      <div style={styles.headerTop}>
        <div>
          <Link to="/" style={styles.logo}>
            MovieDB
          </Link>
        </div>
        <form
          style={styles.searchBar}
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un film..."
            style={styles.searchInput}
            onFocus={(e) => {
              e.target.style.borderColor = styles.searchInputHover.borderColor;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc";
            }}
          />
          <button
            type="submit"
            style={styles.searchButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor =
                styles.searchButtonHover.backgroundColor;
              e.target.style.color = styles.searchButtonHover.color;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = styles.searchButton.backgroundColor;
              e.target.style.color = styles.searchButton.color;
            }}
          >
            Rechercher
          </button>
        </form>
      </div>

      {/* Navigation Bar */}
      <nav style={styles.navBar}>
        {[
          { path: "/", label: "Home" },
          { path: "/popular", label: "Popular Movies" },
          { path: "/animation", label: "Animated Films" },
          { path: "/romance", label: "Romance Movies" },
          { path: "/adult", label: "Adult Movies" },
        ].map((link, index) => (
          <Link
            key={index}
            to={link.path}
            style={styles.navLink}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = styles.navLinkHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = styles.navBar.backgroundColor)
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
