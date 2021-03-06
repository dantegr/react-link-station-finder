//This is the Header Componet that handles the display of the tilte and subtule of the app.

import React from 'react';

const Header = (props) => {
  return (
    <div className="header">
    <div className="container">
      <h1 className="header__title">{props.title}</h1>
      {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>} 
      </div>
    </div>
  );
};

Header.defaultProps = {
  title: 'Link Station Finder'
};

export default Header;