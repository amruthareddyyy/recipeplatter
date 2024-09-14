import React from "react";
import { Link } from "react-router-dom";

const RecipeLists = ({ recipe }) => {
  const id = recipe.id;
  const title = recipe.source.title;

  // Define the styles for the card
  const cardStyle = {
    background: 'rgb(255 255 255 / 38%)', // Transparent background
    border: '1px solid rgba(255, 255, 255, 0.3)', // Thinner border
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Adjusted box-shadow for transparency
    padding: '1.5rem',
    margin: '1rem',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    overflow: 'hidden',
    position: 'relative',
    width: 'calc(100% + 0.3cm)', // Increase the width by 0.3 cm
    display: 'flex',
    flexDirection: 'column',
    height: '300px', // Set a fixed height to ensure uniformity
    textDecoration: 'none', // Remove default underline
    color: 'white', // Change text color to white
    fontFamily: "'Arial', sans-serif", // Example font, adjust as needed
  };
  
  // Additional style for title
  const titleStyle = {
    margin: '0.5rem 0',
    fontSize: '1.0rem',
    color: 'white', // Ensure title text is white
    fontFamily: "'Arial', sans-serif", // Example font, adjust as needed
  };

  const sectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  };

  return (
    <Link to={`/recipe/${id}`} style={cardStyle}>
      <div className="section" style={{ ...sectionStyle, flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1rem' }}>
        {/* <span className="category" style={{ color: '#ff6f61', fontWeight: 'bold' }}>
            {id}
        </span> */}
      </div>
      <div className="section" style={{ ...sectionStyle, flexGrow: 1 }}>
        <h3 style={titleStyle}>
            {title}
        </h3>
      </div>
    </Link>
  );
};

export default RecipeLists;
