import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import { loginContext } from "../contexts/LoginContextProvider";
import { useContext, useEffect } from "react";
import "./NavbarDemo.css";
function NavbarDemo() {
  let navigate = useNavigate();

  let { logoutFunction, userState, setUserState } = useContext(loginContext);

  // console.log("userState", userState);

  useEffect(() => {
    navigate("/");
  }, [userState]);
  return (
    <div className="t">
      <div className="App container text-center display-6">
        <span className="m">E</span>-Farming <span className="m">P</span>ortal
      </div>
      {/* <div className="n">
            <NavbarDemo />
          </div> */}
      <Navbar collapseOnSelect expand="lg" className="b">
        <Container>
          <img
            className="hi "
            src="https://png.pngtree.com/png-vector/20200121/ourmid/pngtree-green-leaf-logo-vector-template-png-image_2132738.jpg"
            alt=""
          />
          <Navbar.Brand as={Link} to="/">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/About">
                About
              </Nav.Link>
              {userState && userState?.userType === "customer" && (
                <div>
                  <div>
                    <Nav.Link as={Link} to="/Products">
                      Products
                    </Nav.Link>
                  </div>
                </div>
              )}
              {userState?.userType === "customer" && (
                <div>
                  <Nav.Link as={Link} to="/AddToCart">
                    Cart
                  </Nav.Link>
                </div>
              )}

              {userState?.userType === "farmer" && (
                <Nav.Link as={Link} to="/Shop">
                  Shop
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {userState ? (
                <Nav.Link
                  as={Link}
                  to="/LoginCustomer"
                  onClick={logoutFunction}
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/LoginCustomer">
                  Login
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {!userState && (
                <Nav.Link as={Link} to="/Register">
                  Register
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarDemo;
