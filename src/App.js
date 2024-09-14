import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import RecipeLists from "./Components/RecipeLists";
import RecipeInfo from './Components/RecipeInfo'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import backgroundVideo from './Components/bg-cooking.mp4'; // Import video

import "./App.css"; // Assuming you have some CSS for styling

const backend = "http://13.60.15.198:8000";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes based on the search query
  const searchRecipes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backend}/toprated`);
      const resData = await res.json();
      setRecipes(resData.data || []); // Handle null response
      console.log(resData.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecipesWithFilters = (filteredRecipes) => {
    setRecipes(filteredRecipes);
    console.dir("filters : "+filteredRecipes.data);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipesByKeyword();
  };

  const searchRecipesByKeyword = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backend}/search?keyword=${query}`);
      const resData = await res.json();
      setRecipes(resData.data || []); // Handle null response
      console.log(resData.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div>
        {/* Video Background */}
        <div className="video-container">
          <video autoPlay loop muted className="background-video">
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Content Section */}
        <div className="content">
          {/* Navbar and SearchBar are always visible */}
          <Navbar onApplyFilters={updateRecipesWithFilters}/>
          <div className="container mt-5">
            <SearchBar
              isLoading={isLoading}
              query={query}
              setQuery={setQuery}
              handleSubmit={handleSubmit}
            />

            {/* Render Recipe Cards only on the homepage ("/") */}
            <Routes>
              <Route
                path="/"
                element={
                  <div className="recipes mt-4">
                    {recipes.length > 0 ? (
                      recipes.map((recipe) => (
                        <RecipeLists key={recipe.id} recipe={recipe} />
                      ))
                    ) : (
                      <p>No Results.</p>
                    )}
                  </div>
                }
              />
              {/* Recipe Detail Page */}
              <Route path="/recipe/:id" element={<RecipeInfo />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
