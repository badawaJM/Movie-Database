import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MovieDetails from "./components/MovieDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Popular from "./components/Popular";
import Animation from "./components/Animation";
import Romance from "./components/Romance";
import Adult from "./components/Adult";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (query) => {
    const API_URL = `http://www.omdbapi.com/?apikey=dbf578a4&s=${query}`;
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("Answer of API:", data);

      if (data.Response === "True" && data.Search) {
        setSearchResults(data.Search);
        setErrorMessage(""); 
      } else {
        setSearchResults([]);
        setErrorMessage("No results found. Try another search.");
      }
    } catch (error) {
      console.error("Error while searching :", error);
      setErrorMessage("An error has occurred. Please try again..");
    }
  };

  const styles = {
    appContainer: {
      padding: "20px",
      backgroundColor: "#f8f9fa",
    },
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <div style={styles.appContainer}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                searchResults={searchResults}
                errorMessage={errorMessage}
              />
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/animation" element={<Animation />} />
          <Route path="/romance" element={<Romance />} />
          <Route path="/adult" element={<Adult />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
