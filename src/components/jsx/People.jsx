import React, { useState, useEffect } from 'react';
import getData from '../../utils/getData';
import PeopleModal from './PeopleModal';
import '../css/People.css';

const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
};

const DisplayData = () => { 
    {/* state initialization, utilizing the useState hook */}
    const [faculty, setFaculty] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    getData('people')
      .then((response) => {
        setFaculty([...response.faculty]);
        setStaff([...response.staff]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading data...</h1>;
  }
  return (
    <div className="peopleContainer">
        <h1>FACULTY</h1>
        <div className="facultyContainer">
            {faculty.map((person) => (
                <div className="person" key={person.username}>
                <img className="personImg" src={person.imagePath}></img>
                <h3>{person.name}</h3>
                <h4>{truncateTitle(person.title, 28)}</h4>
                <PeopleModal person={person} />
                </div>
            ))}
        </div>

        <h1>STAFF</h1>
        <div className="staffContainer">
            {staff.map((person) => (
            <div className="person" key={person.username}>
                <img className="personImg" src={person.imagePath}></img>
                <h3>{person.name}</h3>
                <h4>{truncateTitle(person.title, 28)}</h4>
                <PeopleModal person={person} />
            </div>
            ))}
        </div>
    </div>
  );
};

export default DisplayData;
