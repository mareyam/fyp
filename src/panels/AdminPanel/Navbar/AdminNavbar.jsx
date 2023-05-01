import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import brandsenselogo from '../../../images/brandsenselogo.png';

const pages = ['Dashboard', 'Campaigns', 'Influencers', 'BrandManagers'];
const settings = ['Account', '', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor:"#F7F6F7"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
         <img style={{height: '80px', width:'150px', paddingTop:'10px'}}src={brandsenselogo} />
          <Typography
            variant="h6"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
               {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <p style={{textTransform:'lowercase'}}>{page}</p>
                </MenuItem>
              ))}
              
            </Menu>
            <img style={{height: '80px', width:'150px', marginTop:'10px'}}src={brandsenselogo} />
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/BMDashboard"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
                onClick={handleCloseNavMenu}><a href="/PRList" style={{ my: 2, color: 'black', display: 'block', textTransform:"capitalize" }}>PR List</a></Button>
          <Button
                onClick={handleCloseNavMenu}><a href="/BMList" style={{ my: 2, color: 'black', display: 'block', textTransform:"capitalize" }}>BM List</a></Button>
          <Button
                onClick={handleCloseNavMenu}><a href="/BMCampaigns" style={{ my: 2, color: 'black', display: 'block', textTransform:"capitalize" }}>Campaigns</a></Button>
           <Button
                onClick={handleCloseNavMenu}><a href="/BMRegisteredInfluencers" style={{ my: 2, color: 'black', display: 'block', textTransform:"capitalize" }}>Influencers</a></Button>
          <Button
                onClick={handleCloseNavMenu}><a href="/BMHashtags" style={{ my: 2, color: 'black', display: 'block', textTransform:"capitalize" }}>Hashtags</a></Button>

          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

// const pages = ['Dashboard', 'Campaigns', 'Influencers'];
// const settings = ['Profile', 'Account', '', 'Logout'];

// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static" style={{backgroundColor:"#F7F6F7"}}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ color:'black', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.1rem',
//               color: 'black',
//               textDecoration: 'none',
//             }}
//           >
//             BrandSense
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="black"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
              
//             </Menu>
//           </Box>
//           {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="/BMDashboard"
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.1rem',
//               color: 'black',
//               textDecoration: 'none',
//             }}
//           >LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//           <Button
//                 onClick={handleCloseNavMenu}><a href="/BMDashboard" style={{ my: 2, color: 'black', display: 'block', textDecoration:"none" }}>Dashboard</a></Button>
//           <Button
//                 onClick={handleCloseNavMenu}><a href="/BMCampaigns" style={{ my: 2, color: 'black', display: 'block', textDecoration:"none" }}>Campaigns</a></Button>
//            <Button
//                 onClick={handleCloseNavMenu}><a href="/BMRegisteredInfluencers" style={{ my: 2, color: 'black', display: 'block', textDecoration:"none" }}>Influencers</a></Button>
//           <Button
//                 onClick={handleCloseNavMenu}><a href="/BMHashtags" style={{ my: 2, color: 'black', display: 'block', textDecoration:"none" }}>Hashtags</a></Button>
//           <Button
//                 onClick={handleCloseNavMenu}><a href="/BMAllContent" style={{ my: 2, color: 'black', display: 'block', textDecoration:"none" }}>Content</a></Button>
//           </Box>
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ResponsiveAppBar;


// import React from 'react';
// import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import { Container, Row, Col } from 'react-grid-system';


// const Navbarr = () => {
//   return (
//     <Navbar bg="light" expand="lg" fixed="top" className="">
//       <Container>
//         <Row className="space-between">
//           <Col xs={6} sm={4} md={2}>
//             <Navbar.Brand href="#home">BrandSense</Navbar.Brand>
//           </Col>
//           <Col xs={6} sm={8} md={10}>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="mr-auto">
//                 {/* <DashboardIcon/> */}
//                 <Nav.Link href="#dashboard">Dashboard</Nav.Link>
//                 {/* <CampaignIcon/> */}
//                 <Nav.Link href="#campaigns">Campaigns</Nav.Link>
//                 <Nav.Link href="#BrandManagers">BrandManagers</Nav.Link>
//                 <Nav.Link href="#influencers">Influencers</Nav.Link>
//                 <Nav.Link href="#settings">Settings</Nav.Link>
//               </Nav>
//             </Navbar.Collapse>
//           </Col>
//         </Row>
//       </Container>
//     </Navbar>
//   );
// }

// export default Navbarr;



// // import React from 'react';
// // import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
// // import DashboardIcon from '@material-ui/icons/Dashboard';

// // const Navbarr = () => {
// //   return (
// //     <Navbar bg="light" expand="lg">
// //       <Navbar.Brand href="#home">BrandSense</Navbar.Brand>
// //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
// //       <Navbar.Collapse id="basic-navbar-nav">
// //         <Nav className="mr-auto">
// //           {/* <DashboardIcon/> */}
// //           <Nav.Link href="#dashboard">Dashboard</Nav.Link>
// //           {/* <CampaignIcon/> */}
// //           <Nav.Link href="#campaigns">Campaigns</Nav.Link>
// //           <Nav.Link href="#BrandManagers">BrandManagers</Nav.Link>
// //           <Nav.Link href="#influencers">Influencers</Nav.Link>
// //           <Nav.Link href="#settings">Settings</Nav.Link>
          
// //           {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
// //             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
// //             <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
// //             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
// //             <NavDropdown.Divider />
// //             <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
// //           </NavDropdown> */}
// //         </Nav>
// //         {/* <Form inline>
// //           <FormControl type="text" placeholder="Search" className="mr-sm-2" />
// //           <Button variant="outline-success">Search</Button>
// //         </Form> */}
// //       </Navbar.Collapse>
// //     </Navbar>
// //   );
// // }

// // export default Navbarr;


