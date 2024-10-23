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

  
  const squareStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    backgroundColor: 'grey',
    position: 'absolute',
    top: '40px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  
  const rectangleStyle: React.CSSProperties = {
    width: '80px',
    height: '40px',
    backgroundColor: 'grey',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  
  
  const starStyle: React.CSSProperties = {
    width: '0px',
    height: '0px',
    margin: '1em auto',
    fontSize: '2em', 
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



  

const pentagonStyle: React.CSSProperties = {
  width: '60px', 
  height: '60px', 
  backgroundColor: 'grey', 
  position: 'absolute',
  top: '35px', 
  left: '50%', 
  transform: 'translate(-50%, -50%)', 
  clipPath: 'polygon(50% 0%, 100% 38%, 81% 100%, 19% 100%, 0% 38%)', 
};

  

  
  const hexagonStyle: React.CSSProperties = {
    width: '70px',
    height: '40px',
    backgroundColor: 'grey',
    position: 'absolute',
    top: '40px', 
    left: '50%', 
    transform: 'translate(-50%, -50%) rotate(0deg)', 
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', 
  };
  
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
