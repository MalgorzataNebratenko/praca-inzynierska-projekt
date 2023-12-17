import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Container, Button, Nav, Dropdown } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../images/logo1.png';
import '../App.css';
import '../Global.css';
import userIcon from '../images/user-icon.png';
import { UserContext } from '../App.js';
import { ClientContext } from '../App.js';

function Header() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLanguageCourseMenu, setShowLanguageCourseMenu] = useState(false);
    const location = useLocation();
    const [user, setUser] = useState();
    const {setCurrentUser } = useContext(UserContext);
    const {client} = useContext(ClientContext);

    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const username = user ? user.username : '';

    useEffect(() => {
      const fetchCurrentUser = async () => {
        try {
          const response = await client.get("/api/user",
          {
            mode: 'cors',
            credentials: 'include'
          });
          console.log("Response from /api/user:", response.data);
          setUser(response.data);
        } catch (error) {
          setUser(null); // Ustaw null, aby oznaczyć, że nie ma zalogowanego użytkownika
        }
      };
    
      // Wywołaj funkcję fetchCurrentUser tylko jeśli jesteśmy na stronie zalogowanego użytkownika
      if (!isLoginPage && !isRegisterPage) {
        fetchCurrentUser();
      }
    }, [isLoginPage, isRegisterPage]);

    const handleUserMenuToggle = () => {
      setShowUserMenu(!showUserMenu);
    }

    const handleLanguageCourseMenu = () => {
      setShowLanguageCourseMenu(!showLanguageCourseMenu);
    }

    const submitLogout = (e) => {
      e.preventDefault();
      client.post(
        "/api/logout",
        {
          mode: 'cors',
          credentials: 'include'
        }).then(function (res) {
        setCurrentUser(false);
      });
    };
    
    return (
      <div id='App-layout'>
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
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
            <NavLink className="nav-link" to="/lessons">Lekcje</NavLink>
            <NavLink className="nav-link" to="/flashcards">Fiszki</NavLink>
            <NavLink className="nav-link" to="/about">About</NavLink>
          </Nav>
    
          {/* Logo użytkownika i navbar pionowy po najechaniu */}
          <Dropdown
            show={showUserMenu}
            onMouseEnter={handleUserMenuToggle}
            onMouseLeave={handleUserMenuToggle}
          >
            <Dropdown.Toggle className="dropdown-toggle" variant="secondary" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={userIcon} style={{marginRight: '3px'}}/>
              <div style={{ fontSize: '18px' }}>
                {user ? user.user.username : 'Loading...'}
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/profile">Profil</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/stats">Statystyki</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/my-languages">Moje Języki</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/settings">Ustawienia</Dropdown.Item>
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