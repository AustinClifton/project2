import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import getData from '../../utils/getData';

function TabPanel({ area }) {
  return (
    <div style={{ maxHeight: '35vh', overflowY: 'auto', padding: '2vh', background: 'rgb(235,235,235)', }}>
      {area?.citations && area.citations.map((citation, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <Typography>{citation}</Typography>
            <hr/>
        </div>    
      ))}
    </div>
  );
}

TabPanel.propTypes = {
  area: PropTypes.object.isRequired,
};

export default function Research() {
    {/* state initialization, utilizing the useState hook */}
    const [areas, setAreas] = useState([]);
    const [value, setValue] = useState(0);

    useEffect(() => {
        getData('research')
        .then((response) => {
            setAreas(response.byInterestArea || []);
        })
        .catch((error) => {
            console.error('Error fetching research data:', error);
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
        sx={{
            flexGrow: 1,
            bgcolor: 'background.paper',
            display: 'flex',
            width: '65%',
            margin: '0 auto',
            paddingBottom: '5vh',
        }}
        >
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%',}}>
            <h2 style={{ marginLeft: '3%', fontSize: '3em', }}>Research</h2>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', border: '4px solid black', }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{
                minHeight: '35vh',
                maxHeight: '35vh',
                minWidth: '15vw',
                maxWidth: '15vw',
                background: '#F76902',
                fontSize: '40px',
                '& .MuiTabs-scroller': {
                    backgroundColor: '#F76902',
                },
                '& .MuiTabs-indicator': {
                    backgroundColor: 'rgb(235,235,235)',
                    width: '5px',
                },
                }}
            >
            {areas.map((area, index) => (
                <Tab
                    key={index}
                    label={area.areaName}
                    sx={{
                    fontSize: '0.5em',
                    color: value === index ? 'white !important' : 'black',
                    background: value === index ? 'rgb(30, 30, 30)' : 'transparent',
                    '&:hover': {
                        backgroundColor: 'rgb(30, 30, 30)',
                        color: 'white',
                    },
                    }}
                />
            ))}
            </Tabs>
            <TabPanel area={areas[value]} />
            </div>
        </div>
        </Box>
    );
}
