import * as React from 'react';
import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Hidden from '@mui/material/Hidden';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import './css/nav.css';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Degrees', path: '/degrees' },
  { name: 'Create Degree', path: '/create-degree' },
  { name: 'Cohorts', path: '/cohorts' },
  { name: 'Create Cohort', path: '/create-cohort'},
  { name: 'Modules', path: '/modules' },
  { name: 'Create Module', path: '/create-module' },
  { name: 'Create Student', path: '/create-student' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchInput.trim()) {
      navigate(`/student/${searchInput.trim()}`);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Hidden mdUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleOpenNavMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </Hidden>
          <Hidden mdDown>
            {pages.map((page, index) => (
              <Box key={index} sx={{ marginLeft: 2 }}>
                <Typography component={Link} to={page.path} color="inherit" textDecoration="none">
                  {page.name}
                </Typography>
              </Box>
            ))}
          </Hidden>
          <Box sx={{ flexGrow: 1 }} />
          <form onSubmit={handleSearch}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: '4px',
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.25)',
                },
                width: { xs: '100%', md: 'auto' },
                marginLeft: 'auto',
                my: { xs: 1, md: 0 },
              }}
            >
              <InputBase
                sx={{
                  pl: '24px',
                  color: 'inherit',
                  width: '100%',
                }}
                classes={{
                  root: 'inputRoot',
                  input: 'inputInput',
                }}
                placeholder="Search by student ID"
                inputProps={{ 'aria-label': 'search by student ID' }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Box>
          </form>
        </Toolbar>
      </Container>
    </AppBar>
  );
  

}

export default ResponsiveAppBar;