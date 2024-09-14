import React, { useState } from 'react';
import './Navbar.css'; // Import your custom CSS file

function Navbar({ onApplyFilters }) {
  const [activeTab, setActiveTab] = useState('categories');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  
  const backend = "http://13.60.15.198:8000";

  const handleIngredientsChange = (category) => {
    setSelectedIngredients((prevState) =>
      prevState.includes(category)
        ? prevState.filter((item) => item !== category)
        : [...prevState, category]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings([rating]); // Start fresh with the selected rating
  };

  const applyFilters = () => {
    console.log('Selected Ingredients:', selectedIngredients);
    console.log('Selected Ratings:', selectedRatings);

    const data = {
      ingredients: selectedIngredients,
      rating: selectedRatings.length > 0 ? Math.max(...selectedRatings) : null,
    };

    console.log('Sending data:', data);

    // Make the API call
    fetch(`${backend}/filters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Filter response:', result);

        onApplyFilters(result.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <nav className="navbar bg-body-transparent">
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><strong>RecipePlatter</strong></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <strong>Filters</strong>
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#" onClick={() => setActiveTab('categories')}>Ingredients</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => setActiveTab('ratings')}>Rating</a></li>
              </ul>
            </li>
          </ul>
          <div className="filter-options">
            <div className="tabs">
              {activeTab === 'categories' && (
                <div className="tab-content">
                  <div className="checkbox-group horizontal">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Onion"
                        id="category1"
                        checked={selectedIngredients.includes('Onion')}
                        onChange={() => handleIngredientsChange('Onion')}
                      />
                      <label className="form-check-label" htmlFor="category1">Onion</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Tomato"
                        id="category2"
                        checked={selectedIngredients.includes('Tomato')}
                        onChange={() => handleIngredientsChange('Tomato')}
                      />
                      <label className="form-check-label" htmlFor="category2">Tomato</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Chicken"
                        id="category3"
                        checked={selectedIngredients.includes('Chicken')}
                        onChange={() => handleIngredientsChange('Chicken')}
                      />
                      <label className="form-check-label" htmlFor="category3">Chicken</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Eggs"
                        id="category4"
                        checked={selectedIngredients.includes('Eggs')}
                        onChange={() => handleIngredientsChange('Eggs')}
                      />
                      <label className="form-check-label" htmlFor="category4">Eggs</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Sugar"
                        id="category5"
                        checked={selectedIngredients.includes('Sugar')}
                        onChange={() => handleIngredientsChange('Sugar')}
                      />
                      <label className="form-check-label" htmlFor="category5">Sugar</label>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'ratings' && (
                <div className="tab-content">
                  <div className="radio-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="rating"
                        value="1"
                        id="rating1"
                        checked={selectedRatings.includes('1')}
                        onChange={() => handleRatingChange('1')}
                      />
                      <label className="form-check-label" htmlFor="rating1">1 and above</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="rating"
                        value="2"
                        id="rating2"
                        checked={selectedRatings.includes('2')}
                        onChange={() => handleRatingChange('2')}
                      />
                      <label className="form-check-label" htmlFor="rating2">2 and above</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="rating"
                        value="3"
                        id="rating3"
                        checked={selectedRatings.includes('3')}
                        onChange={() => handleRatingChange('3')}
                      />
                      <label className="form-check-label" htmlFor="rating3">3 and above</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="rating"
                        value="4"
                        id="rating4"
                        checked={selectedRatings.includes('4')}
                        onChange={() => handleRatingChange('4')}
                      />
                      <label className="form-check-label" htmlFor="rating4">4 and above</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button className="btn mt-3 btn-custom" onClick={applyFilters}>Apply Filters</button>
            {(selectedIngredients.length > 0 || selectedRatings.length > 0) && (
              <div className="selected-filters mt-3">
                <h6>Selected Filters:</h6>
                <ul>
                  {selectedIngredients.length > 0 && (
                    <li><strong>Ingredients:</strong> {selectedIngredients.join(', ')}</li>
                  )}
                  {selectedRatings.length > 0 && (
                    <li><strong>Ratings:</strong> {selectedRatings.join(', ')}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
