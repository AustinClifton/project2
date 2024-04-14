import React, { useState, useEffect } from 'react';
import getData from '../../utils/getData';
import '../css/Degrees.css';

const Degrees = () => {
  {/* state initialization, utilizing the useState hook */}
  {/* data = all degrees (grad, undergrad, minor), expandedDegrees = expand state of degrees (grad, undergrad) */}
  const [data, setData] = useState({ degrees: { undergraduate: [], graduate: [] }, minors: [] });
  const [expandedDegrees, setExpandedDegrees] = useState({ undergraduate: [], graduate: [] });

  useEffect(() => {
    {/* fetch data for both degrees and minors */}
    Promise.all([
      getData('degrees'),
      getData('minors')
    ])
      .then(([degrees, minors]) => {
        setData({ degrees, minors });
        setExpandedDegrees({
          undergraduate: new Array(degrees.undergraduate.length).fill(false),
          graduate: new Array(degrees.graduate.length).fill(false),
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  {/* section that contains data of all degrees (not minors) */}
  const DegreeSection = ({ degree, index, type }) => {
    {/* state initialization, utilizing the useState hook */}
    const isExpanded = expandedDegrees[type][index];

    {/* function used to change the state of a collapsible degree section*/}
    const toggleExpansion = () => {
      {/* 
          setExpandedDegrees function is called to update the state. 
          It receives a callback function that creates a shallow 
          copy of the previous state object using the spread operator 
          to avoid mutating the original state directly. 
          This copy's expandable state is toggled and then returned.
      */}
      setExpandedDegrees(prevState => {
        const newExpandedDegrees = { ...prevState }; 
        newExpandedDegrees[type][index] = !isExpanded;
        return newExpandedDegrees;
      });
    };

    {/* if the degree = a certificate, html must be run slightly differently */}
    if (degree.degreeName === "graduate advanced certificates") {
      return (
        <div className="collapsible" key={index}>
          {/* input that can be clicked by the user to expand/collapse the container*/}
          <input
            type="checkbox"
            id={`collapsible-head-${type}-${index}`}
            className="collapsible-checkbox"
            checked={isExpanded}
            onChange={toggleExpansion}
          />

          {/* title of degree */}
          <label htmlFor={`collapsible-head-${type}-${index}`}>Graduate Advanced Certificates</label>

          {/* data for the certificate that is initially hidden */}
          <div className="collapsible-text" style={{ display: isExpanded ? 'block' : 'none' }}>
            <ul>
              {degree.availableCertificates.map((certificate, i) => (
                <li key={i}>{certificate}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    {/* if the degree is a standard degree */}
    return (
      <div className="collapsible" key={index}>
        {/* input that can be clicked by the user to expand/collapse the container*/}
        <input
          type="checkbox"
          id={`collapsible-head-${type}-${index}`}
          className="collapsible-checkbox"
          checked={isExpanded}
          onChange={toggleExpansion}
        />

        {/* title of degree */}
        <label htmlFor={`collapsible-head-${type}-${index}`}>{degree.title}</label>

        {/* data for the degree that is initially hidden */}
        <div className="collapsible-text" style={{ display: isExpanded ? 'block' : 'none' }}>
          <p className="degreeDesc">{degree.description}</p>
          {degree.concentrations && (
            <div>
              <p className="concentrationsHeader"><strong>Concentrations:</strong></p>
              <div className="concentrations">
                {/* get each concentration of the degree */}
                {degree.concentrations.map((concentration, i) => (
                  <div key={i} className="degreeConcentration">{concentration}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  {/* section that contains data of all minors */}
  const MinorSection = ({ minor, index }) => {
    {/* state initialization, utilizing the useState hook */}
    const [expanded, setExpanded] = useState(false); {/* state of the container */}
    const [selectedCourse, setSelectedCourse] = useState(null); {/* course that is clicked on by the user */}
    const [courseData, setCourseData] = useState(''); {/* data of the course that is clicked on by the user */}

    {/* function used to change the state of the collapsible minor section */}
    const toggleExpansion = () => {
      setExpanded(prevExpanded => !prevExpanded);
    };

    {/* useEffect hook runs when 'selectedCourse' updates.
      this is used to fetch the data for a single course */}
    useEffect(() => {
      {/* attempt to obtain the data of a specific course given the course's ID */}
      const fetchCourseData = async (courseID) => {
        try {
          {/* get data */}
          const data = await getData(`course/courseID=${courseID}`);

          {/* update state */}
          setSelectedCourse(courseID);
          setCourseData(data);
        } catch (error) {
          console.error('Error fetching course details:', error);
        }
      };

      {/* if there is a course selected, fetch its data */}
      if (selectedCourse) {
        fetchCourseData(selectedCourse);
      }
    }, [selectedCourse]); {/* dependency array, to ensure 'useEffect' is run each time the state of 'selectedCourse' changes */}

    {/* helper function that decodes and returns a string to preserve proper formatting (for course titles) */}
    const decodeEntities = (html) => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = html;
      return textarea.value;
    };

    {/* html to be displayed for the minors section */}
    return (
      <div className="collapsible" key={index}>
        {/* input that can be clicked by the user to expand/collapse the container*/}
        <input
          type="checkbox"
          id={`collapsible-head-minor-${index}`}
          className="collapsible-checkbox"
          checked={expanded}
          onChange={toggleExpansion}
        />

        {/* title of minor */}
        <label htmlFor={`collapsible-head-minor-${index}`}>{minor.title}</label>

        {/* data for each minor that is initially hidden */}
        <div className="collapsible-text" style={{ display: expanded ? 'block' : 'none' }}>
          <p className="minorDesc">{minor.description}</p>
          {/* if the minor has data, then display it */}
          {minor.courses && (
            <div>
              <p className="coursesHeader">
                <strong>Courses:</strong>
              </p>
              <div className="courses">
                {/* generate each course, and when it's clicked, change it to the selected course */}
                {minor.courses.map((course, i) => (
                  <div key={i} className="minorCourse" onClick={() => setSelectedCourse(course)}>
                    {course} 
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* if the selectedCourse has data, then display it */}
          {selectedCourse && (
            <div className="selectedCourseSection">
              <h3>{decodeEntities(courseData.title)} Details</h3>
              <p>Course ID: {courseData.courseID}</p>
              <p>Description: {courseData.description}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  {/* main html for the page, this is what is really getting displayed */}
  return (
    <div className="degreesWrapper">
      <h2>Undergraduate Degrees</h2>
      {data.degrees.undergraduate.map((degree, index) => (
        <DegreeSection
          degree={degree}
          index={index}
          key={index}
          type="undergraduate"
        />
      ))}
      <h2>Graduate Degrees</h2>
      {data.degrees.graduate.map((degree, index) => (
        <DegreeSection
          degree={degree}
          index={index}
          key={index}
          type="graduate"
        />
      ))}
      <h2>Minors</h2>
      {data.minors.UgMinors ? (
        data.minors.UgMinors.map((minor, index) => (
          <MinorSection
            minor={minor}
            index={index}
            key={index}
            type="minors"
          />
        ))
      ) : (
        <div>Loading minors...</div>
      )}
    </div>
  );
};

export default Degrees;
