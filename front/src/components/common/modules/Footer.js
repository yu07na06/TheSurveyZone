import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = () => {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
          TheSurveyZone
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const Footer = () => {
    return (
        <>
          <hr />
            <Box sx={{ bgcolor: 'background.paper', p: 2 }} component="footer">
                <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
                >
                Welcome to Douzone
                </Typography>
                <Copyright />
            </Box>
        </>
    );
};

export default Footer;