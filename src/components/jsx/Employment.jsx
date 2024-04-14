import React, { useState, useEffect } from 'react';
import getData from '../../utils/getData';
import '../css/Employment.css';
import CustomTable from './Tables'; 

const EmploymentDetailsPage = () => {
  {/* state initialization, utilizing the useState hook */}
  const [employmentData, setEmploymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  {/* columns for coop table */}
  const coopColumns = [
    { id: 'employer', label: 'Employer', minWidth: 170 },
    { id: 'degree', label: 'Degree', minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 100 },
    { id: 'term', label: 'Term', minWidth: 100 },
  ];
  {/* columns for employment table */}
  const employmentColumns = [
    { id: 'employer', label: 'Employer', minWidth: 170 },
    { id: 'degree', label: 'Degree', minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 100 },
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'startDate', label: 'Start', minWidth: 100 },
  ];

  {/* used to fetch the data required for the employment section */}
  useEffect(() => {
    const fetchEmploymentData = async () => {
      try {
        const data = await getData('employment');
        setEmploymentData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employment data:', error);
        setLoading(false);
      }
    };
    fetchEmploymentData();
  }, []);

  if (loading) {
    return <div>Loading employment details...</div>;
  }
  return (
    <div className="employmentContainer">
      <h1>Employment Details</h1>

      <div className="intro">
          {employmentData.introduction.content.map((item, index) => (
            <div className={`introText`} key={index}>
                <h3>{item.title}</h3>
                <p className="introDesc">{item.description}</p>
            </div>
          ))}
      </div>

      <div className="statistics">
        {employmentData.degreeStatistics.statistics.map((statistic, index) => {
        //check if the first word of the description includes "percent"
        const hasPercentSign = statistic.description.split(' ')[0].toLowerCase() === 'percent';
        const percentSign = hasPercentSign ? '%' : '';
        return (
            <div className="statSection" key={index}>
            <p className="statValue">{statistic.value + percentSign}</p>
            <p className="statDesc">{statistic.description}</p>
            </div>
        );
        })}
      </div>

      <div className="employerscareers">   
        <div className="careers">
            <h2>Careers</h2>
            <ul>
                {employmentData.careers.careerNames.map((career, index) => (
                <li key={index}>{career}</li>
                ))}
            </ul>
        </div>

        <div className="employers">
            <h2>Employers</h2>
            <ul>
                {employmentData.employers.employerNames.map((employer, index) => (
                <li key={index}>{employer}</li>
                ))}
            </ul>
        </div>
      </div>

      <div>
        <h2>Co-op Opportunities</h2>
        <CustomTable data={employmentData.coopTable.coopInformation} columns={coopColumns} />
        
        <h2>Employment Opportunities</h2>
        <CustomTable data={employmentData.employmentTable.professionalEmploymentInformation} columns={employmentColumns} />
      </div>
    </div>
  );
};

export default EmploymentDetailsPage;
