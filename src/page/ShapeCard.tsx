import React from 'react';
import { Shape } from './enum/Shape';

type propType = {
  rotation: '0' | '90' | '180' | '270';
  onclick: () => void;
  shape?: Shape;
};

const ShapeCard = (props: propType) => {
  const cardStyle: React.CSSProperties = {
    position: 'relative',
    width: '100px',
    height: '75px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  // Triangle style
  const triangleStyle: React.CSSProperties = {
    width: '0',
    height: '0',
    borderLeft: '25px solid transparent',
    borderRight: '25px solid transparent',
    borderBottom: '25px solid grey',
    position: 'absolute',
    top: '25px',
    left: '50%',
    transform: `translateX(-50%) rotate(${props.rotation}deg)`,
    transformOrigin: 'center',
  };

  // Circle style
  const circleStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    backgroundColor: 'grey',
    borderRadius: '50%',
    position: 'absolute',
    top: '40px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  // Square style
  const squareStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    backgroundColor: 'grey',
    position: 'absolute',
    top: '40px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  // Rectangle style
  const rectangleStyle: React.CSSProperties = {
    width: '80px',
    height: '40px',
    backgroundColor: 'grey',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  // Diamond style
  // Star style
  const starStyle: React.CSSProperties = {
    width: '0px',
    height: '0px',
    margin: '1em auto',
    fontSize: '2em', // Adjust size as needed
    position: 'relative',
    display: 'block',
    borderRight: '1em solid transparent',
    borderBottom: '0.7em solid grey',
    borderLeft: '1em solid transparent',
    transform: 'rotate(35deg)',
  };

  const starBeforeStyle: React.CSSProperties = {
    borderBottom: '0.8em solid grey',
    borderLeft: '0.3em solid transparent',
    borderRight: '0.3em solid transparent',
    position: 'absolute',
    height: '0',
    width: '0',
    top: '-0.45em',
    left: '-0.65em',
    display: 'block',
    content: '""',
    transform: 'rotate(-35deg)',
  };

  const starAfterStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'block',
    top: '0.03em',
    left: '-1.05em',
    width: '0',
    height: '0',
    borderRight: '1em solid transparent',
    borderBottom: '0.7em solid grey',
    borderLeft: '1em solid transparent',
    transform: 'rotate(-70deg)',
    content: '""',
  };



  // Pentagon style
// Pentagon style
const pentagonStyle: React.CSSProperties = {
  width: '60px', // Width of the pentagon
  height: '60px', // Height of the pentagon
  backgroundColor: 'grey', // Pentagon color
  position: 'absolute',
  top: '35px', // Adjust this to position it correctly
  left: '50%', // Center horizontally
  transform: 'translate(-50%, -50%)', // Center the pentagon
  clipPath: 'polygon(50% 0%, 100% 38%, 81% 100%, 19% 100%, 0% 38%)', // Create a pentagon shape
};

  

  // Hexagon style
  const hexagonStyle: React.CSSProperties = {
    width: '70px',
    height: '40px',
    backgroundColor: 'grey',
    position: 'absolute',
    top: '40px', // Adjust this value if needed
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%) rotate(0deg)', // Center the hexagon
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', // Hexagon shape
  };
  

  // Render the shape based on the prop
  const renderShape = () => {
    switch (props.shape) {
      case 'triangle':
        return <div style={triangleStyle}></div>;
      case 'circle':
        return <div style={circleStyle}></div>;
      case 'square':
        return <div style={squareStyle}></div>;
      case 'rectangle':
        return <div style={rectangleStyle}></div>;
      case 'diamond':
        return  <div style={starStyle}>
        <div style={starBeforeStyle}></div>
        <div style={starAfterStyle}></div>
      </div>;
      case 'pentagon':
        return <div style={pentagonStyle}></div>;
      case 'hexagon':
        return <div style={hexagonStyle}></div>;
      default:
        return <div style={triangleStyle}></div>
    }
  };

  return (
    <div style={cardStyle} onClick={()=>{props.onclick()}}>
      {renderShape()}
    </div>
  );
};

export default ShapeCard;
