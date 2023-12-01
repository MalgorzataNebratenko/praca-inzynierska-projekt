import React, { useState } from 'react';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Button from 'react-bootstrap/Button';
import { Navbar, Container, Button, Nav, Dropdown } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../images/logo1.png';
import '../App.css';
import '../Global.css';
// import { FaUser, FaSignOutAlt, FaFlag } from 'react-icons/fa'; // Importuj odpowiednie ikony
import userIcon from '../images/user-icon.png';

function Header({ submitLogout }) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLanguageCourseMenu, setShowLanguageCourseMenu] = useState(false);
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState();

    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    // const username = currentUser ? currentUser.username : '';

    // useEffect(() => {
    //   const fetchCurrentUser = async () => {
    //     try {
    //       const response = await client.get("/api/user");
    //       setCurrentUser(response.data);
    //     } catch (error) {
    //       setCurrentUser(null); // Ustaw null, aby oznaczyć, że nie ma zalogowanego użytkownika
    //     }
    //   };
    
    //   // Wywołaj funkcję fetchCurrentUser tylko jeśli jesteśmy na stronie zalogowanego użytkownika
    //   if (!isLoginPage && !isRegisterPage) {
    //     fetchCurrentUser();
    //   }
    // }, [isLoginPage, isRegisterPage]);

    const handleUserMenuToggle = () => {
      setShowUserMenu(!showUserMenu);
    }

    const handleLanguageCourseMenu = () => {
      setShowLanguageCourseMenu(!showLanguageCourseMenu);
    }
    
    return (
      <div id='App-layout'>
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>
        <NavLink to="/home" style={{ textDecoration: 'none' }}>
        <img
                src={logo}
                height="35"
                className="d-inline-block align-top"
                alt="Linguastine Logo"
                
                />{' '}
                <h3 className="logo-text d-inline-block fontKingAndQueen">Linguastine</h3>
          </NavLink>
          </Navbar.Brand>
    
          {!isLoginPage && !isRegisterPage && (
            <>
          {/* Navbar z 3 opcjami: Lekcje, Fiszki, About */}
          <Nav className="mr-auto">
            <Nav.Link className="nav-link" href="#lessons">Lekcje</Nav.Link>
            <Nav.Link className="nav-link" href="#flashcards">Fiszki</Nav.Link>
            <Nav.Link className="nav-link" href="#about">About</Nav.Link>
          </Nav>
    
          {/* Logo użytkownika i navbar pionowy po najechaniu */}
          <Dropdown
            show={showUserMenu}
            onMouseEnter={handleUserMenuToggle}
            onMouseLeave={handleUserMenuToggle}
          >
            <Dropdown.Toggle className="dropdown-toggle" variant="secondary">
              <img src={userIcon} />{' Nazwa użytkownika'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#profil">Profil</Dropdown.Item>
              <Dropdown.Item href="#statystyki">Statystyki</Dropdown.Item>
              <Dropdown.Item href="#moje-jezyki">Moje Języki</Dropdown.Item>
              <Dropdown.Item href="#ustawienia">Ustawienia</Dropdown.Item>
              {/* <Dropdown.Item href="#wyloguj"><FaSignOutAlt /> Wyloguj</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
    
          {/* Miejsce na flagę danego kraju i navbar pionowy po najechaniu */}
          <Dropdown
            show={showLanguageCourseMenu}
            onMouseEnter={handleLanguageCourseMenu}
            onMouseLeave={handleLanguageCourseMenu}
          >
            <Dropdown.Toggle variant="secondary">
              {/* <FaFlag />{' Język'} */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#jezyk1">Język 1</Dropdown.Item>
              <Dropdown.Item href="#jezyk2">Język 2</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
    
          {/* Przycisk Wyloguj */}
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" className="btn btn-warning btn-rounded" data-mdb-ripple-color="#ffffff" style={{backgroundColor:'#f19c51', border:'none'}}>Log out</Button>
                </form>
              </Navbar.Text>
              </>
          )}
          {(isLoginPage) && (
            <Nav>
              {/* <Nav.Link  className="nav-link">Register</Nav.Link> */}
              <Button type="button" as={NavLink} to="/register" className="btn btn-warning btn-rounded" data-mdb-ripple-color="#ffffff" style={{backgroundColor:'#f19c51', border:'none'}}>Register</Button>
            </Nav>
          )}
          {(isRegisterPage) && (
            <Nav>
              {/* <Nav.Link as={NavLink} to="/login" className="nav-link">Login</Nav.Link> */}
              <Button type="button" as={NavLink} to="/login" className="btn btn-warning btn-rounded" data-mdb-ripple-color="#ffffff" style={{backgroundColor:'#f19c51', border:'none'}}>Login</Button>
            </Nav>
          )}
          </Container>
        </Navbar>
        </div>
      );
}

export default Header;