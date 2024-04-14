import React from 'react';
import '../css/Header.css';

const Header = () => {
  return (
    <div className="pageHeader">
      <a href="https://www.rit.edu/" target="_blank" className="ritImage"><img className="pageHeaderImage" src="./src/assets/ritLogo.svg" alt="RIT Logo Image" /></a>
      <a href="https://www.rit.edu/" target="_blank" className="pageTitle">
        <div className="title_1">Golisano College of</div>
        <div className="title_2">Computing and Information Sciences</div>
      </a>
      <div className="extra"></div>
    </div>
  );
};

export default Header;
