import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Form,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";
import Image from "react-bootstrap/Image";

export default function MainNav() {
  const logo =
    "https://d3ml3b6vywsj0z.cloudfront.net/company_images/605db33b10fce904a76e825a_images.png";
  const imageHeight = 50;
  const imageWidth = 50;
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    router.push(`/artwork?title=true&q=${searchValue}`);
    setIsExpanded(false);
    //add to DB
    setSearchHistory(await addToHistory(`title=true&q=${searchValue}`));
    // (current) => [...current, `title=true&q=${searchValue}`]);
  }
  function handleCollapse() {
    setIsExpanded(!isExpanded);
  }

  return (
    <>
      <Navbar
        bg="light"
        className="fixed-top"
        expand="lg"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>
            <Image
              src={logo}
              rounded
              style={{ height: imageHeight, width: imageWidth }}
            />
            AquaHouse Markham
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleCollapse}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  isExpanded={false}
                  onClick={() => setIsExpanded(false)}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              {/* advance search with Login */}
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    isExpanded={false}
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/search"}
                  >
                    Advance Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {!token && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    isExpanded="false"
                    onClick={() => setIsExpanded(false)}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    isExpanded="false"
                    onClick={() => setIsExpanded(false)}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
            {token && (
              <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            {token && (
              <Nav>
                <NavDropdown
                  title={
                    token.userName.charAt(0).toUpperCase() +
                    token.userName.slice(1)
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <Link href="/favourites" passHref legacyBehavior>
                      <Nav.Link
                        isExpanded="false"
                        onClick={() => setIsExpanded(false)}
                      >
                        Favourites
                      </Nav.Link>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href="/history" passHref legacyBehavior>
                      <Nav.Link
                        isExpanded="false"
                        onClick={() => setIsExpanded(false)}
                      >
                        Search History
                      </Nav.Link>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}
