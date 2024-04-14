import React from 'react';
import '../css/AboutSections.css';
import Lottie from 'lottie-react';
import computerAnimation from '../../assets/animations/computer_animation.json';

const DataSections = ({ aboutObj }) => {
  return (
    <div className="dataSections">
      <div className="aboutSection">
        <div className="aboutText">
          <div className="aboutTitle">{aboutObj.title}.</div>
          <div className="aboutDescription">{aboutObj.description}</div>
          <div className="aboutQuote">
            "{aboutObj.quote}"<br/><br/>~ {aboutObj.quoteAuthor}
          </div>
        </div>
        <div className="computerAnimation">
          <Lottie animationData={computerAnimation} />
        </div>
      </div>
    </div>
  );
};

export default DataSections;
