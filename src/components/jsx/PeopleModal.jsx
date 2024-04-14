import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../css/People.css';

const PeopleModal = ({ person }) => {
  {/* state initialization, utilizing the useState hook */}
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className="modalButton" onClick={handleOpen}>See Details</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalContainer">
          <div className="modalHeader">
            <img className="modalImage" src={person.imagePath} alt={person.name} />
            <div className="modalNameTagline">
                <Typography variant="h4">
                    {person.name+`\n`}
                </Typography>
                {person.tagline && (
                    <Typography variant="h7">
                    {person.tagline+`\n`}
                    </Typography>
                )}
                {person.title && (
                <Typography variant="h7">
                    Title: {person.title}
                </Typography>
                )}
            </div>
          </div>
          <div className="modalInfo">
            {person.interestArea && (
              <Typography>
                Interest Area: {person.interestArea}
              </Typography>
            )}
            {person.office && (
              <Typography>
                Office: {person.office}
              </Typography>
            )}
            {person.website && (
              <Typography>
                Website: <a href={person.website} target="_blank">{person.website}</a>
              </Typography>
            )}
            {person.phone && (
              <Typography>
                Phone: {person.phone}
              </Typography>
            )}
            {person.email && (
              <Typography>
                Email: {person.email}
              </Typography>
            )}
            {person.twitter && (
              <Typography>
                Twitter: {person.twitter}
              </Typography>
            )}
            {person.facebook && (
              <Typography>
                Facebook: {person.facebook}
              </Typography>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PeopleModal;
