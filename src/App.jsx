import React, {  useState } from 'react';
import './components/css/App.css';
import getData from './utils/getData';
import People  from './components/jsx/People';
import Header from './components/jsx/Header';
import DataSections from './components/jsx/AboutSections';
import Degrees from './components/jsx/Degrees';
import Employment from './components/jsx/Employment';
import Research from './components/jsx/Research';
//npm install @mui/material @emotion/react @emotion/styled

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [aboutObj, setAboutObj] = useState();

  React.useEffect(() => {
    getData('about').then((about) => {
      setAboutObj(about);
      setLoaded(true);
    });
  }, []);

  if (!loaded)
    return (
      <>
        <div className="loading">
          <p>loading iSchool...</p>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <img className="headerImg" src="./src/assets/codeBackground.jpg" alt="Background image of html code" />
      <DataSections aboutObj={aboutObj} />
      <Degrees/>
      <Employment/>
      <People/>
      <Research />
    </>
  );
};

export default App;
