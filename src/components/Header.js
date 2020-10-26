import React from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return (
            <div className='container'>
                <Navbar expand='lg'>
                    <Navbar.Brand>EasyFlight</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className="mr-auto">
                        </Nav>
                        <Button variant='outline-primary' className='button-1 mr-sm-1'>Login</Button>
                        <Button variant='outline-primary' className='button-1'>Register</Button>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header;